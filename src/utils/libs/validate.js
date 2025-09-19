/**
 * Fix And Parse JSON (Support for handling complex escape JSON strings)
 * @private
 */
/*
 - Always try JSON.parse first;
 - If parsing fails, unescape \" → ";
 - Then process the outermost object or array key-by-key, value-by-value;
 - If a top-level value is an unquoted object or array (e.g. messages: [ {...} ]),
   recursively treat that value as a new root to repair;
 - For values wrapped in quotes ('...' or "..."), extract the inner text and
   re-encode it using JSON.stringify (ensures internal single/double quotes
   are not corrupted);
 - Set MAX_DEPTH to prevent infinite recursion.
*/
// fixAndParseJSON - recursively repairs top-level key/value
// (when encountering outermost values that are objects/arrays, it recurses)

/*
DEMO:

// ✅ Valid JSON (contains svg and single-quote content)
const okJson = `{
  "label":"<svg width='16' height='16'><path fill='currentColor' d='M19 13h-6'/></svg> New Session",
  "value":"new",
  "onClick":"method.setVal(''); method.clearData();"
}`;

// ❌ Single-quote JSON
const badJson = "{'model':'{model}','messages':[{'role':'user','content':'{message}'}],'stream': true}";

// ❌ Escaped JSON
const badJson2 = "{\\\"label\\\":\\\"<svg width='16' height='16' viewBox='0 0 24 24'><path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg> New Session\\\",\\\"value\\\":\\\"new\\\",\\\"onClick\\\":\\\"method.setVal(''); method.clearData();\\\"}";

const badJson3 = "{\"label\":\"<svg width='16' height='16' viewBox='0 0 24 24'><path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg> New Session\",\"value\":\"new\",\"onClick\":\"method.setVal(''); method.clearData();\"}";

const badJson4 = "[{\"label\":\"<svg fill='currentColor' width='12' height='12' viewBox='0 0 24 24'><path d='M20.5 9a3.49 3.49 0 0 0-3.45 3h-1.1a2.49 2.49 0 0 0-4.396-1.052L8.878 9.731l3.143-4.225a2.458 2.458 0 0 0 2.98-.019L17.339 8H16v1h3V6h-1v1.243l-2.336-2.512A2.473 2.473 0 0 0 16 3.5a2.5 2.5 0 0 0-5 0 2.474 2.474 0 0 0 .343 1.243L7.947 9.308 4.955 7.947a2.404 2.404 0 0 0-.161-1.438l3.704-1.385-.44 1.371.942.333L10 4 7.172 3l-.334.943 1.01.357-3.659 1.368a2.498 2.498 0 1 0-.682 4.117l2.085 2.688-2.053 2.76a2.5 2.5 0 1 0 .87 3.864l3.484 1.587-1.055.373.334.943L10 21l-1-2.828-.943.333.435 1.354-3.608-1.645A2.471 2.471 0 0 0 5 17.5a2.5 2.5 0 0 0-.058-.527l3.053-1.405 3.476 4.48a2.498 2.498 0 1 0 4.113.075L18 17.707V19h1v-3h-3v1h1.293l-2.416 2.416a2.466 2.466 0 0 0-2.667-.047l-3.283-4.23 2.554-1.176A2.494 2.494 0 0 0 15.95 13h1.1a3.493 3.493 0 1 0 3.45-4zm-7-7A1.5 1.5 0 1 1 12 3.5 1.502 1.502 0 0 1 13.5 2zm0 18a1.5 1.5 0 1 1-1.5 1.5 1.502 1.502 0 0 1 1.5-1.5zM1 7.5a1.5 1.5 0 1 1 2.457 1.145l-.144.112A1.496 1.496 0 0 1 1 7.5zm3.32 1.703a2.507 2.507 0 0 0 .264-.326l2.752 1.251-1.124 1.512zM2.5 19A1.5 1.5 0 1 1 4 17.5 1.502 1.502 0 0 1 2.5 19zm2.037-2.941a2.518 2.518 0 0 0-.193-.234l1.885-2.532 1.136 1.464zm3.76-1.731L6.849 12.46l1.42-1.908L11.1 11.84a2.29 2.29 0 0 0-.033 1.213zM13.5 14a1.5 1.5 0 1 1 1.5-1.5 1.502 1.502 0 0 1-1.5 1.5zm7 1a2.5 2.5 0 1 1 2.5-2.5 2.502 2.502 0 0 1-2.5 2.5zm1.5-2.5a1.5 1.5 0 1 1-1.5-1.5 1.502 1.502 0 0 1 1.5 1.5z'/><path fill='none' d='M0 0h24v24H0z'/></svg> Deep Thought","value":"brief","onClick":"if(isActive){method.executeCustomMethod('changeModel', true)}else{method.executeCustomMethod('changeModel', false)}"},{"label":"<svg fill='currentColor' width='12' height='12' viewBox='0 0 24 24'><path d='M19 2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-4.414L12 18.586 9.414 16H5V4h14v12z'/></svg> Concise Answer","value":"brief","onClick":"if(isActive){method.setContextData({systemPrompt:'Please answer concisely, around 150 words, keep reasoning brief',mergedText:method.getContextData().mergedText,analyzeMetrics:method.getContextData().analyzeMetrics});}else{method.setContextData({mergedText:method.getContextData().mergedText,analyzeMetrics:method.getContextData().analyzeMetrics});}"},{"label":"<svg fill='none' width='12' height='12' viewBox='0 0 16 16'><path d='M7 0.0618896V9H15.9381C15.446 12.9463 12.0796 16 8 16C3.58172 16 0 12.4183 0 8C0 3.92038 3.05369 0.553988 7 0.0618896Z' fill='currentColor'/><path d='M9 0.0618897V7H15.9381C15.4869 3.38128 12.6187 0.513137 9 0.0618897Z' fill='currentColor'/></svg> Metrics Analysis","value":"lab","onClick":"return method.executeCustomMethod('getLibList')","isSelect":true,"dynamicOptions":true}]";


console.log('okJson =>', fixAndParseJSON(okJson));     // parses correctly
console.log('badJson =>', fixAndParseJSON(badJson));   // repaired and parsed
console.log('badJson2 =>', fixAndParseJSON(badJson2)); // repaired and parsed
console.log('badJson3 =>', fixAndParseJSON(badJson3)); // repaired and parsed
console.log('badJson4 =>', fixAndParseJSON(badJson4)); // repaired and parsed
*/
function fixAndParseJSON(input) {
    const MAX_DEPTH = 6;

    // 1. Fast attempt
    try {
        return { success: true, data: JSON.parse(input) };
    } catch (e) {
        // continue to repair
    }

    // 2. Simple unescape of \" (common when copied from JS literals)
    let s = input;
    if (s.includes('\\"')) s = s.replace(/\\"/g, '"');
    s = s.trim();

    try {
        if (s.startsWith('{')) {
            s = processTopObject(s, 0, MAX_DEPTH);
        } else if (s.startsWith('[')) {
            s = processTopArray(s, 0, MAX_DEPTH);
        } else {
            throw new Error('Input is not an object or array');
        }

        return { success: true, data: JSON.parse(s) };
    } catch (err) {
        return { success: false, error: 'Invalid JSON format', details: err.message };
    }
}

/* ---------- Helper (recursive) functions ---------- */

function processTopObject(str, depth, MAX_DEPTH) {
    if (depth > MAX_DEPTH) return str;
    str = str.trim();
    // Ensure it is wrapped in { ... }
    if (!(str.startsWith('{') && str.endsWith('}'))) {
        const f = str.indexOf('{'), l = str.lastIndexOf('}');
        if (f === -1 || l === -1 || l <= f) return str;
        str = str.slice(f, l + 1);
    }
    const inner = str.slice(1, -1);
    const pairs = splitTopLevel(inner);

    const repairedPairs = pairs.map(pair => {
        if (!pair || pair.trim() === '') return '';
        const idx = findTopLevelColon(pair);
        if (idx === -1) {
            return pair; // Non key:value fragment, keep as is (rare case)
        }
        const rawKey = pair.slice(0, idx).trim();
        const rawVal = pair.slice(idx + 1);

        const keyContent = extractKeyContent(rawKey);
        const keyJson = JSON.stringify(keyContent);

        const repairedValue = repairPossiblyQuotedValue(rawVal, depth + 1, MAX_DEPTH);

        return keyJson + ':' + repairedValue;
    });

    return '{' + repairedPairs.join(',') + '}';
}

function processTopArray(str, depth, MAX_DEPTH) {
    if (depth > MAX_DEPTH) return str;
    str = str.trim();
    if (!(str.startsWith('[') && str.endsWith(']'))) {
        const f = str.indexOf('['), l = str.lastIndexOf(']');
        if (f === -1 || l === -1 || l <= f) return str;
        str = str.slice(f, l + 1);
    }
    const inner = str.slice(1, -1);
    const elements = splitTopLevel(inner);

    const processed = elements.map(el => {
        const t = el.trim();
        if (t === '') return '';
        if (t.startsWith('{')) return processTopObject(t, depth + 1, MAX_DEPTH);
        if (t.startsWith('[')) return processTopArray(t, depth + 1, MAX_DEPTH);
        return repairPossiblyQuotedValue(t, depth + 1, MAX_DEPTH);
    });

    return '[' + processed.join(',') + ']';
}

// If value is quoted, extract inside and JSON.stringify again (safe escaping)
// If value is unquoted object/array literal, recurse treating it as new root
// Otherwise return as is (numbers, booleans, null, or raw expressions)
function repairPossiblyQuotedValue(rawVal, depth, MAX_DEPTH) {
    const v = rawVal.trim();
    if (v === '') return v;

    if (v[0] === '"' || v[0] === "'") {
        const quote = v[0];
        // Find the last unescaped matching quote
        let lastPos = -1;
        for (let i = v.length - 1; i >= 0; i--) {
            if (v[i] === quote) {
                // check if escaped
                let bs = 0, k = i - 1;
                while (k >= 0 && v[k] === '\\') { bs++; k--; }
                if (bs % 2 === 0) { lastPos = i; break; }
            }
        }
        const inner = lastPos > 0 ? v.slice(1, lastPos) : v.slice(1);
        return JSON.stringify(inner); // Generate valid JSON string (auto escape)
    }

    // If unquoted object/array literal -> recurse
    if (v.startsWith('{')) {
        return processTopObject(v, depth, MAX_DEPTH);
    }
    if (v.startsWith('[')) {
        return processTopArray(v, depth, MAX_DEPTH);
    }

    // Other (number, boolean, null, raw expression): return as is
    return v;
}

/* --------- Utils: split by top-level commas, find colon, extract key --------- */

// Split string by top-level commas (ignores commas inside strings/objects/arrays/parentheses)
function splitTopLevel(str) {
    const parts = [];
    let buf = '';
    let depthCurly = 0, depthSquare = 0, depthParen = 0;
    let inSingle = false, inDouble = false, esc = false;

    for (let i = 0; i < str.length; i++) {
        const ch = str[i];

        if (esc) {
            buf += ch;
            esc = false;
            continue;
        }
        if (ch === '\\') {
            buf += ch;
            esc = true;
            continue;
        }

        if (ch === "'" && !inDouble) { inSingle = !inSingle; buf += ch; continue; }
        if (ch === '"' && !inSingle) { inDouble = !inDouble; buf += ch; continue; }

        if (!inSingle && !inDouble) {
            if (ch === '{') { depthCurly++; buf += ch; continue; }
            if (ch === '}') { depthCurly--; buf += ch; continue; }
            if (ch === '[') { depthSquare++; buf += ch; continue; }
            if (ch === ']') { depthSquare--; buf += ch; continue; }
            if (ch === '(') { depthParen++; buf += ch; continue; }
            if (ch === ')') { depthParen--; buf += ch; continue; }

            if (ch === ',' && depthCurly === 0 && depthSquare === 0 && depthParen === 0) {
                parts.push(buf);
                buf = '';
                continue;
            }
        }

        buf += ch;
    }
    if (buf.trim() !== '') parts.push(buf);
    return parts;
}

// Find the first top-level colon (ignores strings and nested structures)
function findTopLevelColon(str) {
    let inSingle = false, inDouble = false, esc = false;
    let depthCurly = 0, depthSquare = 0, depthParen = 0;
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (esc) { esc = false; continue; }
        if (ch === '\\') { esc = true; continue; }
        if (ch === "'" && !inDouble) { inSingle = !inSingle; continue; }
        if (ch === '"' && !inSingle) { inDouble = !inDouble; continue; }

        if (!inSingle && !inDouble) {
            if (ch === '{') { depthCurly++; continue; }
            if (ch === '}') { depthCurly--; continue; }
            if (ch === '[') { depthSquare++; continue; }
            if (ch === ']') { depthSquare--; continue; }
            if (ch === '(') { depthParen++; continue; }
            if (ch === ')') { depthParen--; continue; }

            if (ch === ':' && depthCurly === 0 && depthSquare === 0 && depthParen === 0) {
                return i;
            }
        }
    }
    return -1;
}

// Extract key content (supports "key", 'key', key) → returns pure string key
function extractKeyContent(rawKey) {
    const r = rawKey.trim();
    if ((r.startsWith('"') && r.endsWith('"')) || (r.startsWith("'") && r.endsWith("'"))) {
        const inner = r.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
        return inner;
    }
    return r;
}

/**
 * Determine whether it is in JSON format
 * @private
 */
function isJSON(input) {

    if (typeof (input) === 'string' && input.length > 0) {
        return fixAndParseJSON(input).success;
    } else {

        if (
            typeof (input) === 'object' &&
            Object.prototype.toString.call(input) === '[object Object]' &&
            !input.length
        ) {
            return true;
        } else {
            return false;
        }

    }

}
/**
 * Object validation
 * @public
 * @param {String} input
 * @return {Boolean}
 */

function isEmpty(input) {
    if ( Array.isArray(input) ) {
        return input.some((str) => !str.replace(/\s/g, '').length === true )
    } else {
        return !input.replace(/\s/g, '').length === true;
    }
}
function isNumber(input) {
    const reg = /^[\d|\.|,]+$/;
    return reg.test(input);
}
function isInt(input) {
    if (input == "") {
        return false;
    }
    const reg = /\D+/;
    return !reg.test(input);
}
function isEmail(input) {
    const reg = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    return reg.test(input);
}
function isTel(input) {
    //const reg = /^[\d|\-|\s|\_]+$/;
    const reg = /^[0-9- ]{7,20}$/;
    return reg.test(input);
}
function isMobile(input) {
    //const reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
    const reg = /^1[0-9]{10}$/;
    return reg.test(input);
}


export {
    isJSON,
    isEmpty,
    isNumber,
    isInt,
    isEmail,
    isTel,
    isMobile
}