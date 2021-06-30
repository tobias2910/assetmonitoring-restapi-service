"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const passport_1 = __importDefault(require("passport"));
const httpException_1 = __importDefault(require("../utils/httpException"));
function authorizeUser(...requiredRights) {
    return (req, res, next) => {
        passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user || info) {
                next(new httpException_1.default(http_status_1.default.UNAUTHORIZED, 'Not authenticated!'));
            }
            next();
        })(req, res, next);
    };
}
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=authMiddleware.js.map