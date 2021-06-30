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
const class_validator_1 = require("class-validator");
var AssetType;
(function (AssetType) {
    AssetType["Crypto"] = "Crypto";
    AssetType["Fiat"] = "Fiat";
    AssetType["Stock"] = "Stock";
})(AssetType || (AssetType = {}));
var Platform;
(function (Platform) {
    Platform["Reddit"] = "Reddit";
    Platform["Twitter"] = "Twitter";
})(Platform || (Platform = {}));
class Analysis {
}
__decorate([
    class_validator_1.IsString({ message: `Property 'assetType' is not type string.` }),
    class_validator_1.IsEnum(AssetType, { message: `Property 'assetType' must be 'Stock', 'Crypto' or 'Fiat'.` }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Analysis.prototype, "assetType", void 0);
__decorate([
    class_validator_1.IsString({ message: `Property 'name' is not type string.` }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Analysis.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString({ message: `Property 'symbol' is not type string.` }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Analysis.prototype, "symbol", void 0);
__decorate([
    class_validator_1.IsString({ message: `Property 'platform' is not type string.` }),
    class_validator_1.IsEnum(Platform, { message: `Property 'Platform' must be 'Reddit' or 'Twitter'.` }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Analysis.prototype, "platform", void 0);
__decorate([
    class_validator_1.IsString({ message: `Property 'source' is not type string.` }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Analysis.prototype, "source", void 0);
__decorate([
    class_validator_1.IsNumber({ allowInfinity: false, maxDecimalPlaces: 0 }, { message: `Property 'numberRecords' is not a number.` }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], Analysis.prototype, "numberRecords", void 0);
exports.default = Analysis;
//# sourceMappingURL=analysis.validation.js.map