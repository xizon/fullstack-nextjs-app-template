import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import { TEMPLATE_FILES_PATH } from './constants';

const execPromise = promisify(exec);

@Injectable()
export class PhpService {
    async runScript(scriptName: string, params: any): Promise<string> {

        const fullPath = path.join(__dirname, TEMPLATE_FILES_PATH, `${scriptName}`);  // .php file path

        // Convert the parameters to URL query strings
        const queryString = Object.entries(params || {})
            .map(([key, value]) => `${key}=${value}`)
            .join('&');


        // Execute via php commands and pass parameters at the same time
        const command = queryString
            ? `php ${fullPath} "${queryString}"`
            : `php ${fullPath}`;

        try {
            const { stdout, stderr } = await execPromise(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        } catch (error) {
            throw new Error(`Error running PHP script: ${error.message}`);
        }
    }
}


