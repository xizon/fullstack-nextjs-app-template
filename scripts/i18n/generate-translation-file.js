/**
 *  Generate a translation file
 * 
 */
const path = require('path');
const fs = require('fs');
const srcPath = path.resolve(__dirname, '../../src/');
const pageNextPath = path.resolve(__dirname, '../../pages/');
const potFileContent = {
    "////////// NOTE: Generated with \"node scripts/i18n/generate-translation-file.js\", you could change the language value you want.": "////////// 提示: 此文件由 \"node scripts/i18n/generate-translation-file.js\" 命令自动生成，您可以修改属性值为想要的语言",
    "English Characters": "中文字符串"
};

const recursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.readdirSync(src).forEach(function (childItemName) {
            
            if ( 
                childItemName.indexOf('.tsx') !== -1 || 
                childItemName.indexOf('.js') !== -1 || 
                childItemName.indexOf('.ts') !== -1) 
            {
                
                const filePath = path.join(src, childItemName);

                // find the translation string from the file
                const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
                const result = data.match(/t\([\s]?"([^']*?)"[\s]?\)|t\([\s]?'([^"]*?)'[\s]?\)/g);  // ['t("Like")', 't( "Body" )']
                
                if ( result !== null ) {
                    const fields = result.map(function(el) { return el.replace(/^t\([\s]?'|'[\s]?\)$|^t\([\s]?"|"[\s]?\)$/g, ""); });
        
                    fields.forEach( function(field) {
                        potFileContent[field] = '';
                    });
                }

            }
            
            recursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    }
};


recursiveSync(srcPath, '');
recursiveSync(pageNextPath, '');

//
const targetFile = 'src/lang/pot/site.lang.auto-generated.json';
fs.mkdirSync(path.resolve(__dirname, '../../src/lang/pot/'), { recursive: true });
fs.writeFile(path.join(path.resolve(__dirname, '../../'), targetFile), JSON.stringify(potFileContent, null, 4), 'utf8', function (err) {
    if (err) return console.log(err);
    console.log('\x1b[36m%s\x1b[0m', `--> Generated "${targetFile}" successfully`);
});