"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    async createNewUser(req, res, next) {
        try {
            const user = await user_service_1.default.createNewUser(req.body);
            res.status(http_status_1.default.CREATED).json({ message: 'Sign Up successful!' });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map