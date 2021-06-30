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
let Analytic = class Analytic {
};
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], Analytic.prototype, "AssetType", void 0);
__decorate([
    typegoose_1.prop({
        required: false,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Country", void 0);
__decorate([
    typegoose_1.prop({
        required: false,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Exchange", void 0);
__decorate([
    typegoose_1.prop({
        required: false,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Industry", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Name", void 0);
__decorate([
    typegoose_1.prop({
        required: false,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Sector", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Symbol", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
    }),
    __metadata("design:type", Date)
], Analytic.prototype, "timestamp", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Platform", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: false
    }),
    __metadata("design:type", String)
], Analytic.prototype, "Source", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
    }),
    __metadata("design:type", Number)
], Analytic.prototype, "Sentiment", void 0);
Analytic = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            collection: 'assetAnalytics'
        }
    })
], Analytic);
exports.default = Analytic;
//# sourceMappingURL=analytic.model.js.map