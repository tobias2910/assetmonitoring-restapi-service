"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = __importDefault(require("../models/user.model"));
const tokens_1 = require("./tokens");
class Passport {
    constructor() {
        this.jwtOptions = this.defineJwtOptions();
        this.jwtStrategy = new passport_jwt_1.Strategy(this.jwtOptions, this.jwtVerify);
    }
    /**
     *
     * @returns {StrategyOptions} -
     */
    defineJwtOptions() {
        return {
            secretOrKey: 'loremIpsum90',
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        };
    }
    /**
     *
     * @param {any} payload -
     * @param {VerifiedCallback} next -
     */
    async jwtVerify(payload, next) {
        try {
            if (payload.type !== tokens_1.tokenTypes.ACCESS) {
                throw new Error('Invalid token type');
            }
            // Init the user model
            const userModel = typegoose_1.getModelForClass(user_model_1.default);
            const user = await userModel.findById(payload.sub);
            if (!user) {
                return next(null, false);
            }
            next(null, user);
        }
        catch (error) {
            next(error, false);
        }
    }
}
exports.Passport = Passport;
exports.default = new Passport().jwtStrategy;
//# sourceMappingURL=passport.js.map