"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
var createLoginService = function (request) { return function (credentials) {
    return request.post(constants_1.CAS_ROUTES, credentials);
}; };
exports["default"] = createLoginService;
