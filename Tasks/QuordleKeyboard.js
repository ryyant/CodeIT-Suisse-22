const get_letters = (answers, attempts) => {
    let fullList = answers.join("");
    // if attempt is answer, remove attempt from full list and answers
    let finalMap = new Map();

    for (i=0; i < attempts.length; i++) {
        let attempt = attempts[i];
        if (answers.includes(attempt)) {
            for (j=0;j<attempt.length;j++) {
                let letter = attempt.charAt(j);
                let index = fullList.indexOf(letter);
                fullList = fullList.slice(0, index) + fullList.slice(index+1);
            }
            for (j=0;j<attempt.length;j++) {
                let letter = attempt.charAt(j);
                if (!fullList.includes(letter)) {
                    if (!finalMap.has(letter)) {
                        finalMap.set(letter, attempts.length - i);
                    }
                }
            }
        } else {
            for (j=0;j<attempt.length;j++) {
                let letter = attempt.charAt(j);
                if (!fullList.includes(letter)) {
                    if (!finalMap.has(letter)) {
                        finalMap.set(letter, attempts.length - i);
                    }
                }
            }
        }
    }
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let finalRes = '';
    let leftover = '';
    for (i=0;i<26;i++) {
        let letter = alphabet.charAt(i);
        if (finalMap.has(letter)) {
            finalRes += finalMap.get(letter).toString();
        } else {
            leftover += letter;
        }
    }
    return [finalRes, leftover];

}

const form_letters = (answers, attempts, numbers) => {
    const res = [];
    for (i=0; i< numbers.length; i+=5) {
        const partition = numbers.slice(i, i + 5);
        res.push(partition);
    }
    let fullList = get_letters(answers, attempts)[0];
    let converted = res.map((row) => row.map((digit) => fullList.includes(digit) ? 1 : 0));
    let temp = converted.map((arr) => arr.join("")).map((digit) => parseInt(digit, 2).toString()).map((num) => String.fromCharCode(64 + Number(num)));
    return temp.join('') + get_letters(answers, attempts)[1];
}

module.exports = { get_letters, form_letters };

module.exports.add = function (x) {
    return x;
};