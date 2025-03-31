import type { NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import crypto from 'crypto';
import apiUrls from '@/config/apiUrls';

/*
macOS：
------------
brew install ffmpeg


Ubuntu / Debian：
------------
sudo apt update
sudo apt install ffmpeg
*/

// Add this function at the top of the file
function calculateTotalSize(directory: string): number {
    let totalSize = 0;
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        if (file.endsWith('.ts')) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
        }
    }
    return totalSize;
}


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


   // Create HLS directory structure
   /*
   stream-cache/
      - hls_123456
        - enc.key
        - enc.keyinfo
        - playlist.m3u8
        - segment_000.ts
        - segment_001.ts
        - segment_002.ts
        - ...
   */
   const hlsDir = path.join(__dirname, '../../../../../stream-cache', `hls_${id}`);
   const playlistFile = path.join(hlsDir, 'playlist.m3u8');
   const keyFile = path.join(hlsDir, 'enc.key');
   const keyInfoFile = path.join(hlsDir, 'enc.keyinfo');
   
    // Check if HLS files already exist
    if (fs.existsSync(hlsDir) && fs.existsSync(playlistFile) && fs.existsSync(keyFile)) {
        console.log('HLS files already exist, sending existing playlist');
        
        // Calculate total size after generation
        const totalSize = calculateTotalSize(hlsDir);
        res.status(200).send({
            "data": { totalSize },
            "message": 'OK',
            "code": 200
        });
        return;
    }

   
   if (!fs.existsSync(hlsDir)) {
       fs.mkdirSync(hlsDir, { recursive: true });
   }

   // Generate encryption key if it doesn't exist
   if (!fs.existsSync(keyFile)) {
       const key: any = crypto.randomBytes(16);
       fs.writeFileSync(keyFile, key);
       
       // Create key info file
       const keyInfoContent = `${apiUrls.HLS_VIDEO_KEY}?id=${id}\n${hlsDir}/enc.key\n${key.toString('hex')}`;
       fs.writeFileSync(keyInfoFile, keyInfoContent);
   }

   // Set response headers for HLS
   res.writeHead(200, {
       'Content-Type': 'application/x-mpegURL',
       'Access-Control-Allow-Origin': '*',
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

           // HLS
           '-hls_time 10', // The length of the segments
           '-hls_list_size 0', // Keep all segments
           '-hls_segment_filename', `${hlsDir}/segment_%03d.ts`,  // segment file name format
           '-hls_key_info_file', keyInfoFile,  // Encrypt key information
           '-hls_flags delete_segments'  // Automatically delete old segments
       ])
       .output(`${hlsDir}/playlist.m3u8`)
       .on('start', (cmd) => console.log('FFmpeg started:', cmd))
       .on('error', (err) => {
           console.error('FFmpeg error:', err);
           res.end();
       })
       .on('end', () => {
           console.log('HLS Generation finished');
           // Send the m3u8 playlist file
           fs.createReadStream(`${hlsDir}/playlist.m3u8`).pipe(res);

            // Calculate total size after generation
            const totalSize = calculateTotalSize(hlsDir);
            res.status(200).send({
                "data": { totalSize },
                "message": 'OK',
                "code": 200
            });
       })
       .run();

}