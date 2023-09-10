

/**
 * Evaluating a string as a mathematical expression
 * @param {String} str      - An input string
 * @returns {Number}   - New calculation result.
 */
function evaluate(str) {
    const chars = s.replace(/\s/g, '').split("");
    let n = [], op = [], index = 0, oplast = true;

    n[index] = "";

    // Parse the expression
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

    // Calculate the expression
    s = parseFloat(n[0]);
    for (let o = 0; o < op.length; o++) {
        const num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                s = s + num;
                break;
            case "-":
                s = s - num;
                break;
            case "*":
                s = s * num;
                break;
            case "/":
                s = s / num;
                break;
        }
    }

    return s;
}

module.exports = {
    evaluate
};
