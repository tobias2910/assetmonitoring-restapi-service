"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    async login(req, res, next) {
        try {
            const user = await auth_service_1.default.loginUser(req.body.email, req.body.password);
            const token = await auth_service_1.default.generateJWTToken(user);
            res.status(http_status_1.default.ACCEPTED).json(token);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map