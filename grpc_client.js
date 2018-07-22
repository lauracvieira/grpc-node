var stats_array = require('stats-array');
var sizeof = require('object-sizeof');
var path = require('path');
var fs = require('fs');

var PROTO_PATH = path.resolve(__dirname, 'dsid.proto');

const caller = require('grpc-caller');
var grpc = require('grpc');
var dsid_proto = grpc.load(PROTO_PATH).grpc;

var _STRINGS_TO_TEST = {
    1: "a",
    2: "ab",
    4: "abcd",
    8: "abcdefgh",
    16: "x5cHKQWH0Vsou5Ej",
    32: "xv1lWaeDWxn48TTVEjMFeam74Dj7xaeB",
    64: "VPh1NLqEa80CUurgztYQawE0D6uJWuwqZK8hxrpxflfbkRb3MnoPqAhWFkgLd41p",
    128: "so5aM6kdJb7a9EYKgDtDbWgmW59pU3sQ6TnNjVtRFUVQiHLUNlPfGRbu2tEUnmMuASpmNOr0WnhzYwePiYe594n2eFqAA22jidu85wAz8wwR74PLHOg1412fojP98KcA",
    256: "uMfPDBeBAtELNFnYcAi4JFwST5OyaoJergMCzuueIbWGLlFXYwUPTW3EA7h9EghKSoWVfL2497Rqg3Hx8TCmKU9aAvWwS9FFfwTiMA0B33IqyvTLfj3Gj65jZolhTIv0dJS1YWxWQRNa6kwHyTLvhfThzOpgp5p4aYR1gR30UfdrKCc29EWF9qseIoJirHE9ju7N140Zw8wx4jRIPhC5Vx5JhxPCbarBSTvc1DSTXKzpxA2dEtpWEIIeWMjWGFnF",
    512: "w1E0dYaHTXJrR0rEn5pEQJgi0OqWPY4G72P8P7C2b6Pey0MnDGlretB7jZxxvjVKIB0H6C3DYQvzK10NhOxYONT0QfktCGIo40wXR8tyY2GUpVEH72VZEzLAmYnvgTbVo6ggJ2faKH0eNs73jtGBY2BD8ErhWwelevxsZfkjRqaA7CzyARK6MROfJEbkSf0TZUyGfl5RZhDQFRhOO9spsTLFHOq3wVUdOku9KGGDeTituLEzUjruNdpQ1oc7g29lD5QW0CDK7o3wD8NkcxVll1LgQMzd5105S6p3fpuiJLBWtd8GeFPm7chv1U1BZPhEQF6jdvymSYt7wDYltpt7HhxoHKpuc68eHljAsKH7noAtNYKJZuRCE5LbBUcMz4EX5N311a16zATLOZayiF1F042hpR0UJdcMkBA1f0kQMTRG7nnoTIEk5PLQrubmuwIdLixNxk6sXQMFmGPFolNQDWBPISd76RkiysoK8Ak1By0tuAu79kSEqfM6OWFAkEyZ",
    1024: "xo6TV5sSIHSSVeMvna5YPhuIjgBpIj9RG5u6j5QVPMgnUKDSfoL2YIjDoXmcQjeAknfRg03qc83Xo2npjEbyvDcQIlMgjJpuO91SC3wArcM7nnfvghSJROecz49hmCXNNGlTZ4gTEtT2kt1RN7GyjLBivIvXI2fFsr6HkHRiaskSzdgVPBbwTpSJ0Bbq8fiKWbZfqMmBqGqDrqHoAYIFGg3FCMnRzeBp8t4RM0J1pASiys5WCXdc9p2QEP8aqXjjCbgCMqRfufdWFewowKtlIDdSZmPARA0F4UwFDkD11J4T7eSrCbp3Ml6CG8Hoy1k7x9bcXrxBhpLE5yW9xxQdclrQYu1IVSTks8m5XSWbapMIFoq0lvgjuNWiXLz5vTyiHeOTheiBMstjK7SXNlW9zXEALeaX4m2XuMnIoDawEt8Xl5R7wNAhDiFW8nHdFUxBlyizSaOUHHtmz5ayaomemxoiiurQkOdalHiLj7sdZCevMtHwuAiehGcvmOWRnGm89sg8vlwI7Tsiizrgio84LGkYh9zAkzKwqdo5INixJzsjdMRmfU3Q1ZzxYItlKPcBv3r52wnJv5bq6dHVMUFciuc7B8p4jLp6wUectpi9XcuPFE21y1U8aSb99nAA7sy7uOgu14KUJALwNTiXBLT61QcxzsjQvmCXyHaFShSzDELOrV6LT2kjRszC5zy5lG9t2sad1Cg5BAxLfwQCBHCBBLwnjuqCaTxBABVRjJYGQGqMcoHQdU9pgjmzgWsZQZA8gDq2GTDDG8LEnDVQvXURjc7PI5MmmlkAlv44N65gIUKB87uSiTGHrLYG4CGKlgMW1LTEmGTJQousjed8bcmHnes02lClyOJtB4613annnKs2OHbAXnpeRatka81j4aGejhkazQolSNtHbSRkL1voLjyQXzcC1tTfczAVn0jZOM4c2dBanCY4XMtbTuJjwfgawySH6nqEmX7j8zcq4PMevnzRP1Hww50OQK4xwKdb8QyXurXS8blHt2lM7ZzH7zBN"
}

var longParameter = 12345678988881011;

var numIterations = 50
var objectParameter = {
    longAttr: longParameter,
    stringAttr: "x5cHKQWH0Vsou5Ej",
    booleanAttr: false
};

var rangesForBigRequest = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
var globalResponse;

var timeList = [];
var long_list = [longParameter, longParameter, longParameter, longParameter, longParameter, longParameter, longParameter,
    longParameter
];

function range(size) {
    return Array.from({length: size}, (v, k) => k+1); 
}

function writeFile(string) {
    fs.appendFile(__dirname + "/logs/grpc_client.txt", string + "\n", function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function printResult(parameterType, parameterSize, responseType, responseSize) {

    var result = parameterType + " | " + parameterSize + " | " + responseType + " | " +
        responseSize + " | " + timeList.mean() + " | " + timeList.stdDeviation() + " | " +
        timeList.min() + " | " + timeList.max();
    writeFile(result);
}

async function main() {

    writeFile("Type of parameter | Size of parameter in bytes | Type of response | Size of response in bytes | average time in milliseconds | standard deviation | min time | max time | number of iterations: " + numIterations);

    var client = caller('localhost:8001', PROTO_PATH, "GRPC");

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.VoidRequestVoid({});
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("Void", 0, "Void", sizeof(globalResponse));
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.VoidRequestBigString({});
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("Void", 0, "Big String", sizeof(globalResponse));
    timeList = [];


    for (var key in _STRINGS_TO_TEST) {
        for (var i = 0; i < numIterations; i++) {
            timeList[i] = new Date().getTime();
            await client.StringRequestSameString({
                parameter: _STRINGS_TO_TEST[key]
            });
            timeList[i] = new Date().getTime() - timeList[i];
        }
        printResult("String", sizeof(_STRINGS_TO_TEST[key]), "Same String", sizeof(globalResponse));
    }
    timeList = [];

    for (var key in _STRINGS_TO_TEST) {
        for (var i = 0; i < numIterations; i++) {
            timeList[i] = new Date().getTime();
            await client.StringRequestBigString({
                parameter: _STRINGS_TO_TEST[key]
            });
            timeList[i] = new Date().getTime() - timeList[i];
        }
        printResult("String", sizeof(_STRINGS_TO_TEST[key]), "Big String", sizeof(globalResponse));
    }
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.LongRequestLong({
            parameter: longParameter
        });
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("Long", sizeof(longParameter), "Long", sizeof(globalResponse));
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.EightLongRequestLong({
            parameter1: longParameter,
            parameter2: longParameter,
            parameter3: longParameter,
            parameter4: longParameter,
            parameter5: longParameter,
            parameter6: longParameter,
            parameter7: longParameter,
            parameter8: longParameter
        });
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("8 Long", sizeof(longParameter) * 8, "Long", sizeof(globalResponse));
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.LongListRequestLong({
            parameter: long_list
        });
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("8 Long in a list", sizeof(long_list), "Long", sizeof(globalResponse));
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.LongRequestObject({
            parameter: longParameter
        });
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("Long", sizeof(longParameter), "Object", sizeof(globalResponse));
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.ObjectRequestLong({
            parameter: objectParameter
        });
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("Object", sizeof(objectParameter), "Long", sizeof(globalResponse));
    timeList = [];

    for (var i = 0; i < numIterations; i++) {
        timeList[i] = new Date().getTime();
        await client.ObjectRequestObject({
            parameter: objectParameter
        });
        timeList[i] = new Date().getTime() - timeList[i];
    }
    printResult("Object", sizeof(objectParameter), "Object", sizeof(globalResponse));
    timeList = [];

    for (var value in rangesForBigRequest) {
        bigRequestParameter = range(rangesForBigRequest[value]);
        console.log(bigRequestParameter);
        for (var i = 0; i < numIterations; i++) {
            timeList[i] = new Date().getTime();
            await client.BigIntegerList({
                parameter: bigRequestParameter
            });
            timeList[i] = new Date().getTime() - timeList[i];
        }
        printResult("Big Integer List Request", sizeof(bigRequestParameter), "Void", sizeof(globalResponse));
    }
    timeList = [];

}

main();