var async = require ('async');
//aliases for stdin/out
var stdin = process.stdin,
    stdout = process.stdout;
var async = require('async');
//create user interface for reading input
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var inputArr = [],
    parsedInput = {},
    paramsArr = [],
    finalParams = {},
    inputLen,
    maxNumber;

var welcomeMessage = function(){
                stdout.write(
                    "Welcome to FizzBuzz Playground!\n" +
                    "Input a comma separated list with the numbers and calls\n" +
                    "for each number\n" +
                    "For example to get the output:\n" +
                    "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz\n" +
                    "Enter:\n" +
                    "3 Fizz, 5 Buzz, 10\n" +
                    "So, lets get started!\n");
}
var startInput = async.series([
    function(callback) {
        rl.question("", function(userInput) {
            inputArr.push(userInput);
            rl.close();
            callback();
        });
    },
    function(callback) {
        var i = 0;
        parsedInput = inputArr[0].split(",");
        for (var prop in parsedInput) {
            parsedInput[prop] = parsedInput[prop].trim();
            }
        callback();
    },
    function(callback) {
        inputLen = parsedInput.length;
        maxNumber = parsedInput[inputLen-1];
        console.log("maxNumber: " + maxNumber);
        callback();
    },
    function(callback) {
        for (var prop in parsedInput) {
            paramsArr.push(parsedInput[prop].split(" "));
        }
        callback();
    },
    function(callback) {
        var i;
        for (i = 0; i < inputLen; i++) {
            if (i === inputLen-1) {
                finalParams['maxNumber'] = paramsArr[inputLen-1][0];
                continue;
                };
            finalParams[paramsArr[i][0]] = paramsArr[i][1];
        }
        console.log(finalParams);
        callback();
    },
    function(callback) {
        var i;
        var output = '';
        for (i = 1; i <= maxNumber; i++) {
            output = '';
            for (var p in finalParams) {
                if (p == 'maxNumber') continue;
                p = Number(p);
                if (i % p == 0) output += finalParams[p];
            }
            console.log(i + ": "  + output);
        }
        callback();
    }
]);
welcomeMessage();
startInput;

