
function evaluate(s) {
    const chars = s.replace(/\s/g, '').split("");
    let n = [],
        op = [], 
        index = 0, 
        oplast = true;

    n[index] = "";

    for (let c = 0; c < chars.length; c++) {
        if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
            op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
        } else {
            n[index] += chars[c];
            oplast = false;
        }
    }

    let resStr = parseFloat(n[0]);
    for (let o = 0; o < op.length; o++) {
        const num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                resStr = resStr + num;
                break;
            case "-":
                resStr = resStr - num;
                break;
            case "*":
                resStr = resStr * num;
                break;
            case "/":
                resStr = resStr / num;
                break;
        }
    }

    return resStr;
}

function calcAdd(num1, num2) {
    let baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}

function calcSub(num1, num2) {
    let baseNum, baseNum1, baseNum2;
    let precision;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

function calcMul(num1, num2) {
    let baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
}

function calcDiv(num1, num2) {
    let baseNum1 = 0, baseNum2 = 0;
    let baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * (Math.pow(10, baseNum2 - baseNum1));
}

function isNumeric(s) {
    return !isNaN(parseFloat(s)) && isFinite(s);
}

function isDecimal(num) {
    return num !== Math.floor(num);
}


function truncateDecimals(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
}

function numZeroPad(n, decimalPlaces = 0) {
    return parseFloat(String(n)).toFixed(decimalPlaces);
}

function exceedDecimalPlaces(s, decimalPlaces) {
    const parts = String(s).split(".");
    return parts[1] && parts[1].length > decimalPlaces;
}

function formatNumber(inputValue, decimalPlaces = 0, inputMin = undefined, inputMax = undefined) {
    if (inputValue === '' || !isNumeric(inputValue)) {
        return '';
    }

    if (
        typeof inputMin !== 'undefined' &&
        typeof inputMax !== 'undefined' &&
        isNumeric(inputMin) &&
        isNumeric(inputMax)
    ) {
        inputValue = Math.min(Number(inputValue), inputMax);
        inputValue = Math.max(Number(inputValue), inputMin);
    }

    let formattedValue = String(inputValue).replace(/[^0-9.\-]/g, "");

    const parts = formattedValue.split(".");
    if (parts.length > 2) {
        formattedValue = `${parts[0]}.${parts[1]}`;
    }

    if (parts[1] && parts[1].length > decimalPlaces) {
        formattedValue = parseFloat(formattedValue).toFixed(decimalPlaces);
    }

    formattedValue = Number(formattedValue).toPrecision();

    return formattedValue;
}


export {
    evaluate,
    calcAdd,
    calcSub,
    calcMul,
    calcDiv,
    isNumeric,
    isDecimal,
    truncateDecimals,
    numZeroPad,
    exceedDecimalPlaces,
    formatNumber
}