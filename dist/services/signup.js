"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const createSignUpService = (request, partnerId) => payload => request.post(constants_1.CAS_ROUTES.emailSignUp, Object.assign({}, payload, { partnerId }));
exports.default = createSignUpService;
