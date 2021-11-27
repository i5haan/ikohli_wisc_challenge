var readline = require('readline');

function askAndCheckExpected(expected) {
    return new Promise((resolve, reject) => {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Type "${expected}" to continue, any other key to stop: `, function(answer) {
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
    askAndCheckExpected: askAndCheckExpected,
    askAndReturn: askAndReturn
}