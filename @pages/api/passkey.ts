import type { NextApiRequest, NextApiResponse } from 'next'
import http from 'http';
import https from 'https';
import axios from 'axios';

/*
@Usage:
1. Front-end JS fetch only data:
   http://localhost:3000/api/passkey?session_id=xxxx&fetch=http://example.com&data=1&key=API_KEY

2. Full HTML page:
   http://localhost:3000/api/passkey?session_id=xxxx&fetch=http://example.com&key=API_KEY
*/

const isDev = process.env.NODE_ENV !== 'production';

// Testing requires bypassing unauthenticated https certificates
// FIX: Solved the problem that axios could not make a request and could not authenticate when blocked by Node
function getAgent(url: string) {
    if (new URL(url).protocol === 'https:') {
        return new https.Agent({
            rejectUnauthorized: false // dev only (recommended to be true in production)
        })
    }
    return new http.Agent()
}

async function verifyKey(key: string, fetchApi: string): Promise<boolean> {
    if (!key) return false;

    const authUrl =  isDev ? `http://localhost:4001/key-verify` : `${fetchApi}:4001/key-verify`; 
    
    try {
        
        const res = await axios.post(
            authUrl,
            {
                key
            },
            {
                ...(new URL(authUrl).protocol === 'https:' && {
                    httpsAgent: getAgent(authUrl)
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        )


        return res.status === 200 && res.data.valid === true;
    } catch (error) {
        console.error('Key validation failed:', error);
        return false;
    }
    
}

async function fetchPost(url: string, sid: string) {
    const _url =  isDev ? 'https://yourdomain.com' : url; 

    const res = await axios.post(
        `${_url}:1234/api/list`,
        {},
        {
            ...(new URL(_url).protocol === 'https:' && {
                httpsAgent: getAgent(_url)
            }),
            headers: {
                'auth': sid,
                'Content-Type': 'application/json'
            },
            timeout: 10000
        }
    )

    return res.data
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const sessionId = req.query.session_id as string;
    let fetchApi = req.query.fetch as string;
    const onlyData = req.query.data === '1';
    const apiKey = req.query.key as string;

    // ====== Dynamic acquisition protocol and domain-only (without ports) ======
    if (typeof fetchApi === 'undefined') {
        // Obtain the protocol: Prioritize obtaining it from x-forwarded-proto (for proxy/Vercel support),
        //  otherwise retrieve the encrypted state.
        const protocol = req.headers['x-forwarded-proto'] || (req.socket.remoteAddress?.includes('::') ? 'http' : 'https');
        
        // Get the Host and remove the port number
        // req.headers.host might be "localhost:3000"
        const hostWithPort = req.headers.host || '';
        const domain = hostWithPort.split(':')[0]; 

        // Combined into a pure domain
        fetchApi = `${protocol === 'https' ? 'https' : 'http'}://${domain}`;
    }



    // ====== verify Key ======
    const isValid = await verifyKey(apiKey, fetchApi);

    if (!isValid) {
        return res.status(403).json({ code: -999, message: 'Invalid or missing API Key' });
    }


    // ====== Returns only JSON (for front-end JS) ======
    if (onlyData) {
        try {
            const response = await fetchPost(fetchApi, sessionId);
            const resData = response?.list ?? [];
            return res.status(200).json(resData);
        } catch (e) {
            return res.status(500).json({ message: 'fetch failed' });
        }
    }

    // ====== Return to the HTML skeleton ======
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      margin: 0;
      padding: .5rem;
      background: transparent;
    }
    .loading {
      text-align: left;
      color: #999;
      padding: 1rem 0;
      font-size: 12px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 15px;
    }
  </style>
</head>
<body>

  <!-- loading -->
  <div id="loading" class="loading">Loading…</div>

  <!-- app list -->
  <div id="my-app" class="grid" style="display:none"></div>

  <script>
    async function loadList() {
        try {
            // 1. Get the URL object of the current page
            const url = new URL(window.location.href);
            const fetchApi = \`\${url.protocol}//\${url.hostname}\`;

            // 2. Set or override parameters to ensure that only one data and key exist
            url.searchParams.set('data', '1');

            // If the current URL already has a key, set will overwrite it and will not be repeated
            // If not, this step ensures that the fetch request still carries the key
            const apiKey = url.searchParams.get('key');
            if (apiKey) {
                url.searchParams.set('key', apiKey);
            }

            // 3. next
            const res = await fetch(url.toString());
            const list = await res.json()

            const grid = document.getElementById('my-app')
            grid.innerHTML = list.map(item => {

                return \`
                <div class="item" onclick="onItemClick('\${item.name}')">
                <h6 class="item-name">\${item.name}</h6>
                </div>
            \`
            }).join('')

            document.getElementById('loading').style.display = 'none'
            grid.style.display = 'grid'
        } catch (e) {
            document.getElementById('loading').innerText = 'Loading failed.'
        }
    }

    // demo click
    function onItemClick(name) {
        // Base domain and Headers
        const currentUrlObj = new URL(window.location.href);

        //
        const fetchParam = currentUrlObj.searchParams.get('fetch');

        let fetchApi;
        if (fetchParam && fetchParam !== 'undefined' && fetchParam !== 'null') {
            fetchApi = fetchParam;
        } else {
            fetchApi = \`\${currentUrlObj.protocol}//\${currentUrlObj.hostname}\`;
        }

        if (fetchApi.includes('localhost')) {
            fetchApi = 'https://yourdomain.com';
        }

        let _url = fetchApi || '';
        if (_url.endsWith('/')) _url = _url.slice(0, -1);
        const sessionId = currentUrlObj.searchParams.get('session_id') || '';

        alert('click：' + name + _url + sessionId );
    }

    loadList()
  </script>

</body>
</html>
`

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
