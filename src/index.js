function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s+/g, '');
    try {
        isPaired(expr);
        try {
            divZero(expr);

            console.log(splitStr(expr));
            while (!isFinite(expr)) {
                if (expr.includes("(")) {
                    let replace = cut(expr);
                    console.log(replace);
                    let cutExpr = sumOrSub(multiOrDiv(replace));
                    console.log(cutExpr);
                    expr = expr.replace(replace, getNumber(cutExpr));

                } else {
                    console.log(expr);
                    let cutExpr = sumOrSub(multiOrDiv(expr));
                    console.log(cutExpr);
                    expr = cutExpr;
                    console.log(expr);
                }
            }
            result = getNumber(expr);
            return result;

        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e);
    }
}

function getNumber(mas) {
    for (item in mas) {
        if (isFinite(mas[item])) {
            return mas[item];
        }
    }
    return NaN;
}

function splitStr(str) {
    let mas = [];
    let cut = 0;
    for (let i = 0; i < str.length; i++) {
        if (!(isFinite(str[i]) && str[i] == ".") && !(i === 0 && str[i] === "-")) {
            mas.push(str[i]);
            console.log(str[i]);

        } else {
            for (let j = i; j < str.length; j++) {
                if (j == 0 && str[j] == "-") {
                    j++;
                }
                if (!isFinite(str[j]) && str[j] != ".") {
                    cut = j - 1;
                    break;
                } else {
                    if (j == str.length - 1) {
                        cut = j;
                        break;
                    }
                }
            }
            console.log(mas.push(str.substring(i, cut + 1)));
            i = cut;
        }
    }
    return mas;
};

function multiOrDiv(cutExpr) {
    let mas = splitStr(cutExpr);
    console.log(mas);
    for (let i = 0; i < mas.length; i++) {
        if (mas[i] == "*") {
            mas.splice(i - 1, 3, Number(mas[i - 1]) *
                Number(mas[i + 1]));
            i = i - 1;
            console.log(mas);
        }
        if (mas[i] == "/") {
            mas.splice(i - 1, 3, Number(mas[i - 1]) /
                Number(mas[i + 1]));
            i = i - 1;
            console.log(mas);
        }
    }
    return mas;
}

function sumOrSub(mas) {
    for (let i = 0; i < mas.length; i++) {
        if (mas[i] == "+") {
            mas.splice(i - 1, 3, Number(mas[i - 1]) +
                Number(mas[i + 1]));
            i = i - 1;
            console.log(mas);
        }
        if (mas[i] == "-") {
            mas.splice(i - 1, 3, Number(mas[i - 1]) -
                Number(mas[i + 1]));
            i = i - 1;
            console.log(mas);
        }
    }
    return mas;
}

function cut(str) {
    let resCut = str;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "(") {
            for (let j = i; j < str.length; j++) {
                if (str[j] == ")") {
                    resCut = str.substring(i, j + 1);
                    break;
                }
            }
        }
    }
    return resCut;
}

function isPaired(exp) {
    let countOpen = 0;
    let countClose = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == "(") {
            countOpen += 1;
        }
        if (exp[i] == ")") {
            countClose += 1;
        }
    }
    if (countOpen != countClose) {
        throw new ExpressionError("Brackets must be paired");
    }
}

function divZero(expr) {
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == "/" && expr[i + 1] == "0") {
            throw new TypeError("Division by zero.");
        }
    }
}

module.exports = {
    expressionCalculator
}