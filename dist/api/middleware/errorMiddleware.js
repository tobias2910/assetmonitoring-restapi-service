"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
function exceptionMiddleware(error, req, res, next) {
    const statusCode = error.status || http_status_1.default.INTERNAL_SERVER_ERROR;
    const message = error.message || http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    // Store the error message for morgan
    res.locals.errorMessage = message;
    res.status(statusCode)
        .json({
        statusCode, message
    });
}
exports.default = exceptionMiddleware;
//# sourceMappingURL=errorMiddleware.js.map