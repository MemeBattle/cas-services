"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var services_1 = require("./services");
var createCasServices = function (_a) {
    var casURI = _a.casURI, partnerId = _a.partnerId;
    var baseRequest = axios_1["default"].create({ baseURL: casURI });
    var loginService = services_1.createLoginService(baseRequest);
    var signUpService = services_1.createSignUpService(baseRequest, partnerId);
    return { loginService: loginService, signUpService: signUpService };
};
exports.createCasServices = createCasServices;
