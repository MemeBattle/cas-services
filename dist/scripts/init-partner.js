"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const axios_1 = require("axios");
const readline = require("readline");
const chalk_1 = require("chalk");
const chalkAnimation = require("chalk-animation");
const tokenHard = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzM4ZjZlZTMxZDRjMjAxOTMxZDgyOTgiLCJwZXJtaXNzaW9ucyI6eyJDQVMiOlsiZnVsbCJdfSwiaWF0IjoxNTUwODU5NTc2LCJleHAiOjE1NTEwMzIzNzZ9.oJIDxxwlan0r1tolRRvDPCaNIMFeohjzC-d3-n6HogcC9OP4WCL4ELs6tkSIfdf-pfd0CDOp3xN5z3i6BX8K8DtI36tyXbOV3GQHq39Q-ZeoCRPWEpEqOmQVXQz0tUFSmJ2pfxdrzkr69sQ2mnIPuE_xXf8AFKc_cPOY5mfIlOT35c6my9YDG1r_Dp7y5aAa4D8BkNSCiIZK0oEtH-AfEFbpByP3Q6IbbLyIFizWhrL6MP2LUeTTSjktMGqLfMm_t7qFJXvIurLrIGH1y5afLlYJxHUoHJRYpyLEBoUtVq3TrDP9n3330uHUBKmcPtLviL12_xirY8atCnzMg8aF9w';
const CAS_BASE_URI = 'https://cas.mems.fun';
const DEFAULT_KEY_PATH = './key.pem';
const createCasRoutes = (casURI = CAS_BASE_URI) => ({
    createPartner: `${casURI}/partners`,
    loginRequest: `${casURI}/auth/login`,
    getPartnerKey: partnerId => `${casURI}/partners/${partnerId}/key`,
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const styles = {
    defaultString: chalk_1.default.underline.blue,
    endLine: chalk_1.default.underline.bold.yellow,
    helper: chalk_1.default.underline.gray,
    success: chalk_1.default.green.bold,
};
function decorateObjectMethods(obj, decorator) {
    return Object.entries(obj).reduce((decoratedObject, [key, prop]) => (Object.assign({}, decoratedObject, { [key]: decorator(prop) })), {});
}
const createQuestion = (questionText, defaultValue = '') => new Promise(resolve => rl.question(questionText, answer => {
    resolve(answer || defaultValue);
}));
const checkNotEmptyString = (inputString, errorMessage = '') => {
    if (!inputString.length && errorMessage) {
        throw new Error(errorMessage);
    }
    return inputString.length > 0;
};
const showLoader = asyncFunc => (...args) => __awaiter(this, void 0, void 0, function* () {
    const loader = chalkAnimation.rainbow('Wait CAS answer...');
    const answer = yield asyncFunc(...args);
    loader.stop();
    return answer;
});
const createRequests = CAS_URI => {
    const CAS_ROUTES = createCasRoutes(CAS_URI);
    return {
        loginRequest: (credentials) => __awaiter(this, void 0, void 0, function* () {
            const answer = yield axios_1.default.post(CAS_ROUTES.loginRequest, credentials);
            return answer.data.data;
        }),
        createPartner: (userData, token) => __awaiter(this, void 0, void 0, function* () {
            const answer = yield axios_1.default.post(CAS_ROUTES.createPartner, userData, {
                headers: { Authorization: token },
            });
            return answer.data.data;
        }),
        getKey: (partnerId, token) => __awaiter(this, void 0, void 0, function* () {
            const answer = yield axios_1.default.get(CAS_ROUTES.getPartnerKey(partnerId), {
                headers: { Authorization: token },
            });
            return answer.data;
        }),
    };
};
const partnerSignUp = (user, createPartner, token) => __awaiter(this, void 0, void 0, function* () {
    const partnerUsername = yield createQuestion(`Partner username (${styles.defaultString(user.username)}): `, user.username);
    checkNotEmptyString(partnerUsername, 'Username must be not empty');
    const partnerEmail = yield createQuestion(`Partner email (${styles.defaultString(user.email)}): `);
    checkNotEmptyString(partnerUsername, 'Partner email must be not empty');
    const partnerPassword = yield createQuestion(`Partner password: `);
    checkNotEmptyString(partnerUsername, 'Password must be not empty');
    const answer = yield createPartner({
        email: partnerEmail,
        username: partnerUsername,
        password: partnerPassword,
    }, token);
    return answer._id;
});
const initPartner = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const CAS_URI = yield createQuestion(`CAS uri (${styles.defaultString(CAS_BASE_URI)}): `, CAS_BASE_URI);
        const { loginRequest, createPartner, getKey } = decorateObjectMethods(createRequests(CAS_URI), showLoader);
        const username = yield createQuestion(`username: `);
        checkNotEmptyString(username, 'Username must be not empty');
        const password = yield createQuestion('password: ');
        checkNotEmptyString(password, 'Password must be not empty');
        const { token, user } = yield loginRequest({ login: username, password });
        console.log(styles.success(`Hello, ${user.username}`));
        const partnerId = yield createQuestion(`partnerId (${styles.helper('blank field to create new')}): `);
        const newPartnerId = partnerId || (yield partnerSignUp(user, createPartner, token));
        const key = yield getKey(newPartnerId, token);
        console.log('key: ', key);
        const keyPath = yield createQuestion(`Path to save a key (${styles.defaultString(DEFAULT_KEY_PATH)}): `, DEFAULT_KEY_PATH);
        fs.writeFileSync(keyPath, key, { flag: 'w+' });
    }
    catch (e) {
        console.error(e);
    }
    finally {
        console.log(styles.endLine('Good luck :)') + '\n');
        rl.close();
    }
});
initPartner();
