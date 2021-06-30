"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const logger_1 = require("./logger");
const morgan_1 = __importDefault(require("morgan"));
// Define custom token
morgan_1.default.token('message', (req, res) => res.locals.errorMessage || '');
const successResponseFormat = `:method :url :status :res[content-length] - :response-time ms`;
const errorResponseFormat = `:method :url :status :res[content-length] - :response-time ms - message: :message`;
exports.successHandler = morgan_1.default(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.logger.info(message.trim()) }
});
exports.errorHandler = morgan_1.default(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.logger.error(message.trim()) }
});
//# sourceMappingURL=morgan.js.map