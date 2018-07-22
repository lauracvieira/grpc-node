var PROTO_PATH = __dirname + '/dsid.proto';

var grpc = require('grpc');
var dsid_proto = grpc.load(PROTO_PATH).grpc;

var smallStringResponse = "x5cHKQWH0Vsou5Ej";
var bigStringResponse = "xo6TV5sSIHSSVeMvna5YPhuIjgBpIj9RG5u6j5QVPMgnUKDSfoL2YIjDoXmcQjeAknfRg03qc83Xo2npjEbyvDcQIlMgjJpuO91SC3wArcM7nnfvghSJROecz49hmCXNNGlTZ4gTEtT2kt1RN7GyjLBivIvXI2fFsr6HkHRiaskSzdgVPBbwTpSJ0Bbq8fiKWbZfqMmBqGqDrqHoAYIFGg3FCMnRzeBp8t4RM0J1pASiys5WCXdc9p2QEP8aqXjjCbgCMqRfufdWFewowKtlIDdSZmPARA0F4UwFDkD11J4T7eSrCbp3Ml6CG8Hoy1k7x9bcXrxBhpLE5yW9xxQdclrQYu1IVSTks8m5XSWbapMIFoq0lvgjuNWiXLz5vTyiHeOTheiBMstjK7SXNlW9zXEALeaX4m2XuMnIoDawEt8Xl5R7wNAhDiFW8nHdFUxBlyizSaOUHHtmz5ayaomemxoiiurQkOdalHiLj7sdZCevMtHwuAiehGcvmOWRnGm89sg8vlwI7Tsiizrgio84LGkYh9zAkzKwqdo5INixJzsjdMRmfU3Q1ZzxYItlKPcBv3r52wnJv5bq6dHVMUFciuc7B8p4jLp6wUectpi9XcuPFE21y1U8aSb99nAA7sy7uOgu14KUJALwNTiXBLT61QcxzsjQvmCXyHaFShSzDELOrV6LT2kjRszC5zy5lG9t2sad1Cg5BAxLfwQCBHCBBLwnjuqCaTxBABVRjJYGQGqMcoHQdU9pgjmzgWsZQZA8gDq2GTDDG8LEnDVQvXURjc7PI5MmmlkAlv44N65gIUKB87uSiTGHrLYG4CGKlgMW1LTEmGTJQousjed8bcmHnes02lClyOJtB4613annnKs2OHbAXnpeRatka81j4aGejhkazQolSNtHbSRkL1voLjyQXzcC1tTfczAVn0jZOM4c2dBanCY4XMtbTuJjwfgawySH6nqEmX7j8zcq4PMevnzRP1Hww50OQK4xwKdb8QyXurXS8blHt2lM7ZzH7zBN";
var longResponse = 12345678988881011;

var objectResponse = {
    longAttr: longResponse,
    stringAttr: smallStringResponse,
    booleanAttr: false
};

function VoidRequestVoid(call, callback) {
    callback(null, {})
};

function VoidRequestBigString(call, callback) {
    callback(null, {
        response: bigStringResponse
    })
};

function StringRequestSameString(call, callback) {
    callback(null, {
        response: call.request.parameter
    })
};

function StringRequestBigString(call, callback) {
    callback(null, {
        response: bigStringResponse
    })
};

function LongRequestLong(call, callback) {
    callback(null, {
        response: longResponse
    })
};

function EightLongRequestLong(call, callback) {
    callback(null, {
        response: longResponse
    })
};

function LongListRequestLong(call, callback) {
    callback(null, {
        response: longResponse
    })
};

function LongRequestObject(call, callback) {
    callback(null, {
        response: objectResponse
    })
};

function ObjectRequestLong(call, callback) {
    callback(null, {
        response: longResponse
    })
};

function ObjectRequestObject(call, callback) {
    callback(null, {
        response: objectResponse
    })
};

function BigIntegerList(call, callback) {
    callback(null, {})
};

function main() {
    var server = new grpc.Server();
    server.addService(dsid_proto.GRPC.service, {
        VoidRequestVoid: VoidRequestVoid,
        VoidRequestBigString: VoidRequestBigString,
        StringRequestSameString: StringRequestSameString,
        StringRequestBigString: StringRequestBigString,
        LongRequestLong: LongRequestLong,
        EightLongRequestLong: EightLongRequestLong,
        LongListRequestLong: LongListRequestLong,
        LongRequestObject: LongRequestObject,
        ObjectRequestLong: ObjectRequestLong,
        ObjectRequestObject: ObjectRequestObject,
        BigIntegerList: BigIntegerList,
    });
    server.bind('0.0.0.0:8001', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();