"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLimiter = exports.generalLimiter = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_1 = __importDefault(require("http-status"));
const httpException_1 = __importDefault(require("../utils/httpException"));
exports.authLimiter = express_rate_limit_1.default({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    handler: (req, res, next) => {
        next(new httpException_1.default(http_status_1.default.TOO_MANY_REQUESTS, 'Too many requests, please try again later.'));
    }
});
exports.generalLimiter = express_rate_limit_1.default({
    windowMs: 5 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: false,
    handler: (req, res, next) => {
        next(new httpException_1.default(http_status_1.default.TOO_MANY_REQUESTS, 'Too many requests, please try again later.'));
    }
});
exports.registerLimiter = express_rate_limit_1.default({
    windowMs: 30 * 60 * 1000,
    max: 1,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
    handler: (req, res, next) => {
        next(new httpException_1.default(http_status_1.default.TOO_MANY_REQUESTS, 'You can only register a new user every 30 minutes.'));
    }
});
//# sourceMappingURL=rateLimiter.js.map