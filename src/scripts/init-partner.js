"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var fs = require("fs");
var axios_1 = require("axios");
var readline = require("readline");
var chalk_1 = require("chalk");
var chalkAnimation = require("chalk-animation");
var tokenHard = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzM4ZjZlZTMxZDRjMjAxOTMxZDgyOTgiLCJwZXJtaXNzaW9ucyI6eyJDQVMiOlsiZnVsbCJdfSwiaWF0IjoxNTUwODU5NTc2LCJleHAiOjE1NTEwMzIzNzZ9.oJIDxxwlan0r1tolRRvDPCaNIMFeohjzC-d3-n6HogcC9OP4WCL4ELs6tkSIfdf-pfd0CDOp3xN5z3i6BX8K8DtI36tyXbOV3GQHq39Q-ZeoCRPWEpEqOmQVXQz0tUFSmJ2pfxdrzkr69sQ2mnIPuE_xXf8AFKc_cPOY5mfIlOT35c6my9YDG1r_Dp7y5aAa4D8BkNSCiIZK0oEtH-AfEFbpByP3Q6IbbLyIFizWhrL6MP2LUeTTSjktMGqLfMm_t7qFJXvIurLrIGH1y5afLlYJxHUoHJRYpyLEBoUtVq3TrDP9n3330uHUBKmcPtLviL12_xirY8atCnzMg8aF9w';
var CAS_BASE_URI = 'https://cas.mems.fun';
var DEFAULT_KEY_PATH = './key.pem';
var createCasRoutes = function (casURI) {
    if (casURI === void 0) { casURI = CAS_BASE_URI; }
    return ({
        createPartner: casURI + "/partners",
        loginRequest: casURI + "/auth/login",
        getPartnerKey: function (partnerId) { return casURI + "/partners/" + partnerId + "/key"; }
    });
};
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var styles = {
    defaultString: chalk_1["default"].underline.blue,
    endLine: chalk_1["default"].underline.bold.yellow,
    helper: chalk_1["default"].underline.gray,
    success: chalk_1["default"].green.bold
};
function decorateObjectMethods(obj, decorator) {
    // @ts-ignore
    return Object.entries(obj).reduce(function (decoratedObject, _a) {
        var key = _a[0], prop = _a[1];
        var _b;
        return (__assign({}, decoratedObject, (_b = {}, _b[key] = decorator(prop), _b)));
    }, {});
}
var createQuestion = function (questionText, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    return new Promise(function (resolve) {
        return rl.question(questionText, function (answer) {
            resolve(answer || defaultValue);
        });
    });
};
var checkNotEmptyString = function (inputString, errorMessage) {
    if (errorMessage === void 0) { errorMessage = ''; }
    if (!inputString.length && errorMessage) {
        throw new Error(errorMessage);
    }
    return inputString.length > 0;
};
var showLoader = function (asyncFunc) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(_this, void 0, void 0, function () {
        var loader, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loader = chalkAnimation.rainbow('Wait CAS answer...');
                    return [4 /*yield*/, asyncFunc.apply(void 0, args)];
                case 1:
                    answer = _a.sent();
                    loader.stop();
                    return [2 /*return*/, answer];
            }
        });
    });
}; };
var createRequests = function (CAS_URI) {
    var CAS_ROUTES = createCasRoutes(CAS_URI);
    return {
        loginRequest: function (credentials) { return __awaiter(_this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(CAS_ROUTES.loginRequest, credentials)];
                    case 1:
                        answer = _a.sent();
                        return [2 /*return*/, answer.data.data];
                }
            });
        }); },
        createPartner: function (userData, token) { return __awaiter(_this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(CAS_ROUTES.createPartner, userData, {
                            headers: { Authorization: token }
                        })];
                    case 1:
                        answer = _a.sent();
                        return [2 /*return*/, answer.data.data];
                }
            });
        }); },
        getKey: function (partnerId, token) { return __awaiter(_this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(CAS_ROUTES.getPartnerKey(partnerId), {
                            headers: { Authorization: token }
                        })];
                    case 1:
                        answer = _a.sent();
                        return [2 /*return*/, answer.data];
                }
            });
        }); }
    };
};
var partnerSignUp = function (user, createPartner, token) { return __awaiter(_this, void 0, void 0, function () {
    var partnerUsername, partnerEmail, partnerPassword, answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createQuestion("Partner username (" + styles.defaultString(user.username) + "): ", user.username)];
            case 1:
                partnerUsername = _a.sent();
                checkNotEmptyString(partnerUsername, 'Username must be not empty');
                return [4 /*yield*/, createQuestion("Partner email (" + styles.defaultString(user.email) + "): ")];
            case 2:
                partnerEmail = _a.sent();
                checkNotEmptyString(partnerUsername, 'Partner email must be not empty');
                return [4 /*yield*/, createQuestion("Partner password: ")];
            case 3:
                partnerPassword = _a.sent();
                checkNotEmptyString(partnerUsername, 'Password must be not empty');
                return [4 /*yield*/, createPartner({
                        email: partnerEmail,
                        username: partnerUsername,
                        password: partnerPassword
                    }, token)];
            case 4:
                answer = _a.sent();
                return [2 /*return*/, answer._id];
        }
    });
}); };
var initPartner = function () { return __awaiter(_this, void 0, void 0, function () {
    var CAS_URI, _a, loginRequest, createPartner, getKey, username, password, _b, token, user, partnerId, newPartnerId, _c, key, keyPath, e_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 10, 11, 12]);
                return [4 /*yield*/, createQuestion("CAS uri (" + styles.defaultString(CAS_BASE_URI) + "): ", CAS_BASE_URI)];
            case 1:
                CAS_URI = _d.sent();
                _a = decorateObjectMethods(createRequests(CAS_URI), showLoader), loginRequest = _a.loginRequest, createPartner = _a.createPartner, getKey = _a.getKey;
                return [4 /*yield*/, createQuestion("username: ")];
            case 2:
                username = _d.sent();
                checkNotEmptyString(username, 'Username must be not empty');
                return [4 /*yield*/, createQuestion('password: ')];
            case 3:
                password = _d.sent();
                checkNotEmptyString(password, 'Password must be not empty');
                return [4 /*yield*/, loginRequest({ login: username, password: password })];
            case 4:
                _b = _d.sent(), token = _b.token, user = _b.user;
                console.log(styles.success("Hello, " + user.username)); // tslint:disable-line:no-console
                return [4 /*yield*/, createQuestion("partnerId (" + styles.helper('blank field to create new') + "): ")];
            case 5:
                partnerId = _d.sent();
                _c = partnerId;
                if (_c) return [3 /*break*/, 7];
                return [4 /*yield*/, partnerSignUp(user, createPartner, token)];
            case 6:
                _c = (_d.sent());
                _d.label = 7;
            case 7:
                newPartnerId = _c;
                return [4 /*yield*/, getKey(newPartnerId, token)];
            case 8:
                key = _d.sent();
                console.log('key: ', key); // tslint:disable-line:no-console
                return [4 /*yield*/, createQuestion("Path to save a key (" + styles.defaultString(DEFAULT_KEY_PATH) + "): ", DEFAULT_KEY_PATH)];
            case 9:
                keyPath = _d.sent();
                fs.writeFileSync(keyPath, key, { flag: 'w+' });
                return [3 /*break*/, 12];
            case 10:
                e_1 = _d.sent();
                console.error(e_1); // tslint:disable-line:no-console
                return [3 /*break*/, 12];
            case 11:
                console.log(styles.endLine('Good luck :)') + '\n'); // tslint:disable-line:no-console
                rl.close();
                return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}); };
initPartner();
