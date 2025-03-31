import type { NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';

export default async function handler(
    req: any,
    res: NextApiResponse<any>
) {
    const referer = req.headers.referer || '';
    const origin = req.headers.origin || '';

    const allowedDomains = ['http://localhost:3000', 'https://your-site.com'];

    // Users are not allowed to access directly in the address bar, 
    // but front-end code is allowed to make requests
    if (
        !allowedDomains.some(domain => referer.startsWith(domain) || origin?.startsWith(domain))
    ) {
        return res.status(403).json({ message: 'Forbidden' });
    }


    // Get the path to the incoming file
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing ID' });
    }

    const hlsKeyPath = path.join(__dirname, '../../../../../stream-cache', `hls_${id}/enc.key`);

    if (fs.existsSync(hlsKeyPath)) {

        const key = fs.readFileSync(hlsKeyPath);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(key);

        return;
    }
    
    return res.status(403).json({ message: 'Forbidden' });

}