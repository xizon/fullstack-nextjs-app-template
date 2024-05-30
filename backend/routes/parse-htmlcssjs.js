const express = require('express');
const router = express.Router();
const path = require('path');

// precompile
/* 
npm install --save-dev --save-exact eslint html-validate list-selectors postcss postcss-plugin-namespace postcss-rename stylelint stylelint-config-standard-scss
*/
const fs = require('fs'), read = fs.readFileSync;
const postcss = require('postcss');  //@https://postcss.org/
const namespace = require('postcss-plugin-namespace');
const stylelint = require("stylelint");  //@https://stylelint.io/ 
const rename = require('postcss-rename'); //@https://github.com/google/postcss-rename
const { ESLint } = require('eslint'); //@https://eslint.org/ 
const listSelectors = require('list-selectors');
const listSelectorsPlugin = listSelectors.plugin;
const { HtmlValidate } = require('html-validate');  // @https://html-validate.org/guide/api/getting-started.html


// beautify
const prettier = require("prettier/standalone");
const plugins = [require("prettier/plugins/postcss"), require("prettier/plugins/html"), require("prettier/plugins/babel"), require("prettier/plugins/estree")];

// minify
const minify = require("@node-minify/core");
const cleanCSS = require('@node-minify/clean-css');
const uglifyjs = require("@node-minify/uglify-js");
const htmlMinifier = require("@node-minify/html-minifier");

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

/*
Add configuration to the root directory:
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
When using Docker, remember to copy the configuration file to the container
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
--------
eslint.config.mjs:
--------
import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        "rules": {
            "no-unused-vars": "off",
        }
    }
];


--------
.stylelintrc.json:
--------
{
    "extends": "stylelint-config-standard-scss"
}

--------
.htmlvalidate.json:
--------
{
  "extends": [
    "html-validate:recommended"
  ],

  "rules": {
    "close-order": "error",
    "void": ["warn", {"style": "omit"}]
  }
}
*/

/*
Usage of client:

axios({
    method: 'post',
    url: xxxxxxx,
    data: {
        files: xxxxxxx
    },
    headers: { 
        'Content-Type': 'application/json',
    }
})
    
Or

axios.post(url, {
    files: xxxxxxx
}, {
    headers: {
        'Content-Type': 'application/json'
    }
})

*/

// Add a binding to handle '/parse-htmlcssjs'
router.post('/', async (req, res) => {

    const { cssCode, jsCode, htmlCode } = req.body;

    const eslint = new ESLint();  // !!! `new ESLint()` should not be written inside `try { ... }catch (err) {}`

    try {
        
        // const cssContent = read(path.resolve(__dirname, '../testfiles/1.css'), 'utf8');
        // const jsContent = read(path.resolve(__dirname, '../testfiles/1.js'), 'utf8');
        // const htmlContent = read(path.resolve(__dirname, '../testfiles/1.html'), 'utf8');

        const cssContent = cssCode;
        const jsContent = jsCode;
        const htmlContent = htmlCode;
        

        /*
            postcss([
                namespace('.test', { ignore: [ /body/, ".icon" ] })
            ]).process(cssContent).then((res) => {
                console.log(res.css)
            });
        */
        

        async function codelintMain() {
            
            // const CUS_PREFIX = 'mytest-';
            const CUS_PREFIX = 'uid-' + uuidv4() + '-';

        
            // ############################################################
            // STEP ONE. CSS
            // ############################################################
            let cssErr = '';
            let cssCheckedContent = '';
            let oldRepStr = [];
            let newRepStr = [];
            let newCssContent = {css: ''};

            if (cssContent !== '' && cssContent !== null && typeof cssContent !== 'undefined') {
            
                try {

            
                    // 1. CSS lint
                    //------------------
                    const csslint = await postcss([
                        stylelint()
                    ]).process(cssContent, {
                        from: undefined,
                        to: undefined
                    });
            
            
                    // 2. Check ok
                    //------------------
                    console.log('--> css ok!');
                    cssCheckedContent = csslint.css;

            
                } catch (err) {
                    cssErr = `ERR: ${err.reason}: line -> ${err.line}, column -> ${err.column}`;
                }
            
                
            
                // 3. Get all selectors
                //------------------
                newCssContent = await postcss([
                    rename({
                        prefix: CUS_PREFIX,
                        ids: true  // Whether to rename ID selectors as well as class selectors
                    })
                ]).process(cssCheckedContent, {
                    from: undefined,
                    to: undefined
                })
            
                let oldSelectorList;
                await postcss(listSelectorsPlugin({ include: ['ids', 'classes'] }, (list) => {
                    oldSelectorList = list;
                }))
                .process(cssCheckedContent, {
                    from: undefined,
                    to: undefined
                });
            
                // console.log(oldSelectorList);
                /*
                {
                    ids: [],
                    classes: [
                        '.fade',
                        '.modal',
                        '.modal-dialog',
                        '.show'
                    ]
                }
                */  
            
            
                let newSelectorList;
                await postcss(listSelectorsPlugin({ include: ['ids', 'classes'] }, (list) => {
                    newSelectorList = list;
                }))
                    .process(newCssContent, {
                        from: undefined,
                        to: undefined
                    });
            
                // console.log(newSelectorList);
                /*
                {
                    ids: [],
                    classes: [
                        '.mytest-fade',
                        '.mytest-modal',
                        '.mytest-modal-dialog',
                        '.mytest-show'
                    ]
                }
                */
            
                oldRepStr = typeof oldSelectorList.ids !== 'undefined' ? oldSelectorList.ids.concat(oldSelectorList.classes).map((v) => v.replace(/\.|\#/g, '')) : [];
                newRepStr = typeof newSelectorList.ids !== 'undefined' ? newSelectorList.ids.concat(newSelectorList.classes).map((v) => v.replace(/\.|\#/g, '')) : [];
            }

        
        
            // ############################################################
            // STEP TWO. JS 
            // ############################################################
            let jsErr = '';
            let jsCheckedContent = '';
        
        
            try {
        
                // 1. Lint files.
                //------------------
                // const results = await eslint.lintFiles([path.resolve(__dirname, './1.js')]);
                const results = await eslint.lintText(jsContent);
        
                // 2. Format the results.
                //------------------        
                jsErr = results[0].messages.map((v, i) => `ERR: ${v.message}: line -> ${v.line}, column -> ${v.column} ` + "\n").join('');

                // 3. generate new string
                //------------------
                if (jsErr === '') {
                    console.log('--> js ok!');
        
                    // match new names
                    const newJsStr = jsContent.replace(/"([^']*?)"|'([^"]*?)'/g, function (match) {
                        let newMatch = match;
                        oldRepStr.forEach((v, i) => {
                            const sRegExp = new RegExp(`${CUS_PREFIX}${CUS_PREFIX}` , 'g');
                            newMatch = newMatch.replace(`${v}`, `${newRepStr[i]}`);
                            newMatch = newMatch.replace(sRegExp, CUS_PREFIX);
                        });
                        return newMatch;
                    });
        
        
                    // Closure function
                    jsCheckedContent = `
                    (function(){ 
                        ${newJsStr}
                    })();
                    `;
                }
        
            } catch (err) {};
        
        
            // ############################################################
            // STEP THREE. HTML
            // ############################################################
            let htmlErr = '';
            let htmlCheckedContent = '';
        
        
            try {
        
                const htmlvalidate = new HtmlValidate();
        
                // 1. Lint html.
                //------------------
                const report = await htmlvalidate.validateString(htmlContent);
                if (!report.valid) {
                    htmlErr = report.results[0].messages.map((v, i) => `ERR: ${v.message}: line -> ${v.line}, column -> ${v.column} ` + "\n").join('');
                }
        
        
                // 2. generate new string
                //------------------
                if (report.valid) {
                    console.log('--> html ok!');
        
                    // match new names
                    htmlCheckedContent = htmlContent.replace(/"([^']*?)"|'([^"]*?)'/g, function (match) {
                        let newMatch = match;
                        oldRepStr.forEach((v, i) => {
                            const sRegExp = new RegExp(`${CUS_PREFIX}${CUS_PREFIX}` , 'g');
                            newMatch = newMatch.replace(`${v}`, `${newRepStr[i]}`);
                            newMatch = newMatch.replace(sRegExp, CUS_PREFIX);
                        });
                        return newMatch;
                    });
        
                }
            
            } catch (err) {};
        
        
        
        
            // ############################################################
            // STEP FOUR. RESULT
            // ############################################################
            if (cssErr !== '') {
                // console.log('--> CSS ERROR: ', cssErr);
            }
            if (jsErr !== '') {
                // console.log('--> JS ERROR: ', jsErr);
            }
            if (htmlErr !== '') {
                // console.log('--> HTML ERROR: ', htmlErr);
            }

        
            if (jsCheckedContent !== '') {
                // console.log('--> new JS String: ', jsCheckedContent);
        
                /*
                (function(){ 
                    const targetUsers = [
                        {
                            user_name: "David", // 【required】Your Name
                            session_id: '',  // （optional）xxxx
                            user_no: '13',  // （optional）xxxx
                            user_id: 23,  // （optional）xxxx
                        }
                    ];
        
                    function test1() {
                        console.log(targetUsers);
                    }
                    function foo_bar() {
                        console.log(targetUsers);
                        document.getElementById('aaa1').innerHTML = '';
                        document.getElementById("aaa2").innerHTML = '';
                        document.quertSelector(".mytest-modal").innerHTML = '';
                        document.quertSelector(".mytest-modal-dialog .btn").className = "class1 class2-2";
                    }
                    window.FU_SysSendToUser(
                        "Hello World",  
                        targetUsers,
                        () => {
                            // Events here
                        }
                    );
        
        
                })();
                */
            }
        
            if (newCssContent.css !== '') {
                // console.log('--> new CSS String: ', newCssContent.css);
        
                /*
                .mytest-modal-dialog {
                    position: relative;
                    width: auto;
                    pointer-events: none;
                }
        
                #mytest-modal-dialog2 {
                    background-color: #f00;
                }
        
                @media (min-width: 1200px) {
                    .mytest-modal.mytest-fade {
                    transition: none;
                    }
                }
                .mytest-modal.mytest-show .mytest-modal-dialog {
                    transform: none;
                }
        
                */
            }
            
            if (htmlCheckedContent !== '') {
                // console.log('--> new HTML String: ', htmlCheckedContent);
        
                /*
                <a href="#">aa</a>
                <div class="mytest-modal-dialog">
                <button type="button">Click me!</button>
                <div id="mytest-show-me">
                    Lorem ipsum
                </div>
                </div>
                */
            }
            
        
            // ############################################################
            // STEP FIVE. BEAUTIFY CODE
            // ############################################################
            async function beautifyCode(string, type) {
                //@https://prettier.io/docs/en/options.html
                const formatted = await prettier.format(string, {
                    parser: type,  // css, html, babel
                    plugins: plugins
                });

                return formatted;
            }

            /*
            (async () => {
                const formatted = await prettier.format("type Query { hello: String }", {
                    parser: "xxxx",
                    plugins,
                });
            })();
            */

            const cssContentBeautified = await beautifyCode(newCssContent.css, 'css');
            const jsContentBeautified = await beautifyCode(jsCheckedContent, 'babel');
            const htmlContentBeautified = await beautifyCode(htmlCheckedContent, 'html');
            

            // ############################################################
            // STEP SIX. MINIFY CODE
            // ############################################################
    
            const cssContentMinified = newCssContent.css === '' ? '' : await minify({
                compressor: cleanCSS,
                content: newCssContent.css
            });
            const jsContentMinified = jsCheckedContent === '' ? '' : await minify({
                compressor: uglifyjs,
                content: jsCheckedContent
            });
            const htmlContentMinified = htmlCheckedContent === '' ? '' : await minify({
                compressor: htmlMinifier,
                content: htmlCheckedContent
            });


            return {
                error: {
                    cssErr,
                    jsErr,
                    htmlErr
                },
                newCode: {
                    css: cssContentBeautified,
                    js: jsContentBeautified,
                    html: htmlContentBeautified
                },
                newCodeMin: {
                    css: cssContentMinified,
                    js: jsContentMinified,
                    html: htmlContentMinified
                }
            }

        
        }

        const checkRes = await codelintMain();
        
        
        return res.json({ data: checkRes });

    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }

});

module.exports = router;