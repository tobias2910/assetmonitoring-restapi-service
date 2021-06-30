"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../models/user.model"));
const httpException_1 = __importDefault(require("../utils/httpException"));
class UserService {
    /**
     *
     * @param userBody
     * @returns
     */
    async createNewUser(userBody) {
        const UserModel = typegoose_1.getModelForClass(user_model_1.default);
        if (await UserModel.isEmailTaken(userBody.email)) {
            throw new httpException_1.default(http_status_1.default.BAD_REQUEST, 'E-Mail is already taken');
        }
        const user = await UserModel.create(userBody);
        return user;
    }
    /**
     *
     * @param id
     * @returns
     */
    async getUserById(id) {
        const UserModel = typegoose_1.getModelForClass(user_model_1.default);
        const user = UserModel.findById(id);
        return user;
    }
    /**
     *
     * @param {string} mail -
     * @returns
     */
    async getUserByEmail(mail) {
        const UserModel = typegoose_1.getModelForClass(user_model_1.default);
        const user = UserModel.findOne({ mail });
        return user;
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map