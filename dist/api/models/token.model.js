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
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const bson_1 = require("bson");
const tokens_1 = require("../config/tokens");
let Token = class Token {
};
__decorate([
    typegoose_1.prop({
        required: true,
        index: true
    }),
    __metadata("design:type", String)
], Token.prototype, "token", void 0);
__decorate([
    typegoose_1.prop({
        ref: 'User',
        required: true
    }),
    __metadata("design:type", bson_1.ObjectId)
], Token.prototype, "user", void 0);
__decorate([
    typegoose_1.prop({
        enum: tokens_1.tokenTypes,
        required: true
    }),
    __metadata("design:type", String)
], Token.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({
        required: true
    }),
    __metadata("design:type", Date)
], Token.prototype, "expires", void 0);
__decorate([
    typegoose_1.prop({
        default: false
    }),
    __metadata("design:type", Boolean)
], Token.prototype, "blacklisted", void 0);
Token = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true
        }
    })
], Token);
exports.default = Token;
//# sourceMappingURL=token.model.js.map