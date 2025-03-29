import type { NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

/*
macOS：
------------
brew install ffmpeg


Ubuntu / Debian：
------------
sudo apt update
sudo apt install ffmpeg
*/

export default async function handler(
    req: any,
    res: NextApiResponse<any>
) {
    const referer = req.headers.referer || '';
    const origin = req.headers.origin || '';
  
    const allowedDomains = ['http://localhost:3000', 'https://matrixflip.com'];
  
    // Users are not allowed to access directly in the address bar, 
    // but front-end code is allowed to make requests
    if (
        !allowedDomains.some(domain => referer.startsWith(domain) || origin?.startsWith(domain))
    ) {
        return res.status(403).json({ message: 'Forbidden' });
    }



    // Get the path to the incoming file
    const { filePath, id } = req.query;

    if (!filePath) {
        return res.status(400).send('File path is required');
    }


    const resolvedPath = path.join(__dirname, '../../../../../', filePath); // Construct an absolute path based on the incoming path
  
    
    // console.log('++++++', resolvedPath); 
    // if the "filePath = /api/wp-content/uploads/2025/03/demo.mp4"
    // "resolvedPath" will be "/<system_root_directory>/<your_sites_root_directory>/api/wp-content/uploads/2025/03/demo.mp4"

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
        return res.status(404).send('File not found');
    }


    // -------------- cache begin --------------
    const cacheDir = path.join(__dirname, '../../../../../stream-cache');
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }

    const fileName = path.basename(filePath as string);
    const cachedFilePath = path.join(cacheDir, `watermarked_${id}_${fileName}`);

    if (fs.existsSync(cachedFilePath)) {
        console.log('Serving from cache:', cachedFilePath);


        // get file size
        const cacheFileSize = fs.statSync(cachedFilePath).size;
        
        res.writeHead(200, {
            'Content-Type': 'video/mp4',
            'Custom-Video-Size': cacheFileSize,
            'Custom-Cache': 'hit',
            'Transfer-Encoding': 'chunked'
        });
        return fs.createReadStream(cachedFilePath).pipe(res);
    }
    // -------------- cache end --------------



    // !!!IMPORTANT: 
    // If "Content-Length" is set, the cloud server may report an error: FFmpeg error: Error: Output stream closed

    // get file size
    const fileSize = fs.statSync(resolvedPath).size;

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Custom-Video-Size': fileSize,
        'Custom-Cache': 'miss',
        'Transfer-Encoding': 'chunked'
    });


    const textWatermarkFilter = `drawtext=text='MATRIXFLIP.COM': \
        fontsize=24: \
        fontcolor=white: \
        x=w-tw-10: \
        y=h-th-10: \
        box=1: \
        boxcolor=black@0.5: \
        boxborderw=5`;


    const ffmpegStream = ffmpeg(resolvedPath)
    
        .outputOptions([
            '-vf', `scale=iw*min(720/iw\,1280/ih):ih*min(720/iw\,1280/ih)`,  // Adjust resolution to max 720p
            '-vf', textWatermarkFilter,  // Add a text watermark
            '-movflags frag_keyframe+empty_moov',
            '-b:v 1000k', // lower bitrate
            '-r 24', // lower framerate
            '-preset fast', // H.264 preset (faster)
            '-crf 28', // quality factor (28 = moderate compression)
            '-b:a 128k', // lower audio bitrate
            '-f mp4'
        ])
        // .videoFilters(`movie=${watermarkImage} [watermark]; [in][watermark] overlay=10:10 [out]`) // Add a image watermark
        .format('mp4')
        .on('start', (cmd) => console.log('FFmpeg started:', cmd))
        .on('error', (err) => {
            console.error('FFmpeg error:', err);
            res.end();
        })
        .on('end', () => {
            console.log('Processing finished, caching file:', cachedFilePath);

            fs.createReadStream(cachedFilePath).pipe(res);
        })
        .save(cachedFilePath);

}