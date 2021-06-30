"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const tokens_1 = require("../config/tokens");
const token_model_1 = __importDefault(require("../models/token.model"));
const user_service_1 = __importDefault(require("../services/user.service"));
const httpException_1 = __importDefault(require("../utils/httpException"));
class TokenService {
    /**
     *
     * @param {ObjectId} userId -
     * @param {moment.Moment} expiresIn -
     * @param {string} type -
     * @param {string} secret -
     */
    generateToken(userId, expiresIn, type, secret = 'loremIpsum90') {
        const payload = {
            sub: userId,
            iat: moment_1.default().unix(),
            exp: expiresIn.unix(),
            type: type
        };
        return jsonwebtoken_1.default.sign(payload, secret);
    }
    /**
     *
     * @param {string} token -
     * @param {string} userId -
     * @param {Moment} expires -
     * @param {string} type -
     * @param {boolean} blacklisted -
     * @returns
     */
    async saveToken(token, userId, expires, type, blacklisted = false) {
        const TokenModel = typegoose_1.getModelForClass(token_model_1.default);
        const tokenDoc = await TokenModel.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted
        });
        return tokenDoc;
    }
    /**
     *
     * @param token
     * @param type
     * @returns
     */
    async verifyToken(token, type) {
        const payload = jsonwebtoken_1.default.verify(token, 'loremIpsum90');
        const TokenModel = typegoose_1.getModelForClass(token_model_1.default);
        const tokenDoc = await TokenModel.findOne({ token, type, user: payload.sub, blacklisted: false });
        if (!tokenDoc) {
            throw new Error('Token not found');
        }
        return tokenDoc;
    }
    /**
     *
     * @param user
     * @returns
     */
    async generateAuthTokens(user) {
        const accessTokenExpires = moment_1.default().add(30, 'minutes');
        const accessToken = this.generateToken(user.id, accessTokenExpires, tokens_1.tokenTypes.ACCESS);
        const refreshTokenExpires = moment_1.default().add(1, 'days');
        const refreshToken = this.generateToken(user.id, refreshTokenExpires, tokens_1.tokenTypes.REFRESH);
        await this.saveToken(refreshToken, user.id, refreshTokenExpires, tokens_1.tokenTypes.REFRESH);
        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate()
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate()
            }
        };
    }
    /**
     *
     * @param {string} email -
     * @returns
     */
    async generateResetPasswordToken(email) {
        const user = await user_service_1.default.getUserByEmail(email);
        if (!user) {
            throw new httpException_1.default(http_status_1.default.NOT_FOUND, 'No users found with this email');
        }
        const expires = moment_1.default().add(30, 'minutes');
        const resetPasswordToken = this.generateToken(user.id, expires, tokens_1.tokenTypes.RESET_PASSWORD);
        await this.saveToken(resetPasswordToken, user.id, expires, tokens_1.tokenTypes.RESET_PASSWORD);
        return resetPasswordToken;
    }
    ;
}
exports.default = new TokenService();
//# sourceMappingURL=token.service.js.map