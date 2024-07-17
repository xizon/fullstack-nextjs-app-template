import { NextResponse } from "next/server";

import fs from 'fs';
import path from 'path';
import axios from "axios";

import CoreUtils from '@/utils/CoreUtils';


const mkdirsSync = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
}

// To handle a POST request to /api/extract-file
export async function POST(req) {
    const publicDir = '../../../../public/';

    const filepath: any = req.query.sourceurl;
    const newFilename = CoreUtils.return('renameFile', filepath);
    const targetPath = path.resolve(__dirname, publicDir + 'static-remote/files/' + newFilename);

    if (!fs.existsSync(targetPath)) {
        // download remote assets
        try {
            const response = await axios.get(filepath, {
                responseType: 'arraybuffer'
            });

            const b64string = Buffer.from(response.data, 'binary').toString('base64');
            let fileData = Buffer.from(b64string, 'base64');

            // from  `.next/server/...`
            mkdirsSync(path.resolve(__dirname, publicDir + 'static-remote/'));
            mkdirsSync(path.resolve(__dirname, publicDir + 'static-remote/files/'));

            //
            if (!fs.existsSync(targetPath)) {
                fs.writeFileSync(targetPath, fileData);
            }

        } catch (err) { };
    }


    return NextResponse.json(`/static-remote/files/${newFilename}`, {
        status: 200
    });
}


