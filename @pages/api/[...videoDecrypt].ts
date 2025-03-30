import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const referer = req.headers.referer || '';
    const origin = req.headers.origin || '';
    const allowedDomains = ['http://localhost:3000', 'https://your-site.com'];

    if (!allowedDomains.some(domain => referer.startsWith(domain) || origin?.startsWith(domain))) {
        return res.status(403).json({ message: 'Forbidden' });
    }


    const { videoDecrypt } = req.query;  // { videoDecrypt: [ 'hls', '123456', 'playlist.m3u8' ] }
    if (!Array.isArray(videoDecrypt)) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    const [hls, id, fileType] = videoDecrypt;


    // Base path to the HLS files
    const hlsDir = path.join(__dirname, '../../../../../stream-cache', `hls_${id}`);

    try {
        let filePath: string;
        let contentType: string;

        if (fileType === 'playlist.m3u8') {
            filePath = path.join(hlsDir, 'playlist.m3u8');
            contentType = 'application/vnd.apple.mpegurl';

            // Get the size information of all TS files
            const m3u8Content = fs.readFileSync(filePath, 'utf-8');
            const tsFiles = fs.readdirSync(hlsDir).filter(file => file.endsWith('.ts'));
            const totalSize = tsFiles.reduce((acc, file) => {
                return acc + fs.statSync(path.join(hlsDir, file)).size;
            }, 0);

            // Add the total size information to the m3u8 file
            const modifiedContent = m3u8Content.replace(
                '#EXTM3U',
                `#EXTM3U\n#EXT-X-TOTAL-SIZE:${totalSize}`
            );
            

            res.setHeader('Content-Type', contentType);
            return res.send(modifiedContent);


        } else if (fileType === 'enc.key') {
            filePath = path.join(hlsDir, 'enc.key');
            contentType = 'application/octet-stream';
        } else if (fileType.endsWith('.ts')) {
            filePath = path.join(hlsDir, fileType);
            contentType = 'video/MP2T';

            // Obtain the size of the current TS file
            const fileSize = fs.statSync(filePath).size;
            res.setHeader('X-File-Size', fileSize);

        } else {
            return res.status(400).json({ message: 'Invalid file type' });
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Set CORS headers if needed
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', contentType);

        // Stream the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error serving HLS file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const config = {
    api: {
        responseLimit: false,
    },
};