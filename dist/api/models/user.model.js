"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_1 = __importDefault(require("../config/roles"));
let User = User_1 = class User {
    /**
     *
     * @param {User} this
     * @returns {Promise<boolean>} -
     */
    static async isEmailTaken(email, excludeUserId) {
        const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
    }
    /**
     *
     * @param {string} password -
     * @returns {Promise <boolean>} -
     */
    async isValidPassword(password) {
        const user = this;
        const compare = bcryptjs_1.default.compare(password, user.password);
        return compare;
    }
};
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: val => validator_1.default.isEmail(val),
            message: 'Invalid email'
        }
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 16,
        validate: {
            validator: val => (val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_\-%*?&])[A-Za-z\d@$!_\-%*?&]{8,10}$/)),
            message: 'Password must contain at least one letter and one number'
        }
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({
        enum: roles_1.default.getRoles(),
        default: roles_1.default.getRoles()[0],
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.prop({
        default: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
User = User_1 = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true
        }
    }),
    typegoose_1.pre('save', async function (next) {
        if (this.isModified('password')) {
            this.password = await bcryptjs_1.default.hash(this.password, 8);
        }
        next();
    })
], User);
exports.default = User;
//# sourceMappingURL=user.model.js.map