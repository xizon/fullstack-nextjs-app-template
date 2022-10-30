import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs';
import path from 'path';
import axios from "axios";

const mkdirsSync = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const publicDir = '../../../../public/';

    const filepath: any = req.query.sourceurl;
    const fileslug = filepath.split('//').pop();
    const filename = filepath.split('/').pop();
    const extension = filename.split('.').pop().toLowerCase();

    const newFilename = filename.replace(`.${extension}`, `-${fileslug.replace(/[^a-zA-Z ]/g, "")}.${extension}`);
    const targetPath = path.resolve(__dirname, publicDir + 'static-remote/images/' + newFilename);

    if ( ! fs.existsSync(targetPath) ) {
        // download remote assets
        try {
            const response = await axios.get(filepath, {
                responseType: 'arraybuffer'
            });

            const b64string = Buffer.from(response.data, 'binary').toString('base64');
            let fileData = Buffer.from(b64string, 'base64');

            // from  `.next/server/...`
            mkdirsSync(path.resolve(__dirname, publicDir + 'static-remote/'));
            mkdirsSync(path.resolve(__dirname, publicDir + 'static-remote/images/'));

            //
            if ( !fs.existsSync(targetPath) ) {
                fs.writeFileSync(targetPath, fileData);
            }

        } catch (err) { };
    }
    
    res.status(200).send(`/static-remote/images/${newFilename}`);



}

