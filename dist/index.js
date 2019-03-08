"use strict";
exports.__esModule = true;
var request_1 = require("./request");
var services_1 = require("./services");
var createCasServices = function (_a) {
    var casURI = _a.casURI, partnerId = _a.partnerId;
    var baseRequest = request_1["default"].create({ baseURL: casURI });
    var loginService = services_1.createLoginService(baseRequest);
    var signUpService = services_1.createSignUpService(baseRequest, partnerId);
    return { loginService: loginService, signUpService: signUpService };
};
exports["default"] = createCasServices;
