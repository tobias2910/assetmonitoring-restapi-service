"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const typegoose_1 = require("@typegoose/typegoose");
const token_service_1 = __importDefault(require("../services/token.service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const httpException_1 = __importDefault(require("../utils/httpException"));
class AuthService {
    /**
     *
     * @param {string} email -
     * @param {string} password -
     */
    async loginUser(email, password) {
        const UserModel = typegoose_1.getModelForClass(user_model_1.default);
        const user = await UserModel.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            throw new httpException_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect mail or password.');
        }
        return user;
    }
    async generateJWTToken(user) {
        const token = token_service_1.default.generateAuthTokens(user);
        return token;
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map