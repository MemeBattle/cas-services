"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scripts/init-partner");
const request_1 = require("./request");
const services_1 = require("./services");
const createCasServices = ({ casURI, partnerId }) => {
    const baseRequest = request_1.default.create({ baseURL: casURI });
    const loginService = services_1.createLoginService(baseRequest);
    const signUpService = services_1.createSignUpService(baseRequest, partnerId);
    return { loginService, signUpService };
};
exports.default = createCasServices;
