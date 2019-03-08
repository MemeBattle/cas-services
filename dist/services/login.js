"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const createLoginService = request => (credentials) => {
    return request.post(constants_1.CAS_ROUTES, credentials);
};
exports.default = createLoginService;
