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
exports.__esModule = true;
var constants_1 = require("../constants");
var createSignUpService = function (request, partnerId) { return function (payload) {
    return request.post(constants_1.CAS_ROUTES.emailSignUp, __assign({}, payload, { partnerId: partnerId }));
}; };
exports["default"] = createSignUpService;
