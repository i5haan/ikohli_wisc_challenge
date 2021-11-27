var readline = require('readline');

function askAndCheckExpteced(expected) {
    return new Promise((resolve, reject) => {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Type ${expected} to move forward: `, function(answer) {
            rl.close();
            if(answer == expected) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}


function askAndReturn(question) {
    return new Promise((resolve, reject) => {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`${question}`, function(answer) {
            rl.close();
            resolve(answer);
        });
    });
}


module.exports = {
    askAndCheckExpteced: askAndCheckExpteced,
    askAndReturn: askAndReturn
}