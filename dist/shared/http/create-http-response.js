"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpPaginatedResponse = exports.createHttpResponse = void 0;
const createHttpResponse = (code, message, payload, isSuccessful = code >= 200 && code <= 299) => {
    return { code, message, payload, isSuccessful };
};
exports.createHttpResponse = createHttpResponse;
const createHttpPaginatedResponse = (code, message, payload, isSuccessful = code >= 200 && code <= 299) => {
    return { code, message, payload, isSuccessful };
};
exports.createHttpPaginatedResponse = createHttpPaginatedResponse;
//# sourceMappingURL=create-http-response.js.map