/**
 * Exclude the "api/" directory when exporting
 */

const fs = require('fs');
const path = require('path');


const copyPath = path.resolve(__dirname, '../app/api');
const targetPath = path.resolve(__dirname, '../__api');

const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    const items = fs.readdirSync(src);

    items.forEach((item) => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};


if (fs.existsSync(copyPath)) {
    copyDir(copyPath, targetPath);
    console.log(`--> copied ${copyPath} to ${targetPath}`);

    // delete old "api"
    fs.rmSync(copyPath, { recursive: true, force: true });
}