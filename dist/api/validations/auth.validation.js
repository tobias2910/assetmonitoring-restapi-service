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
class Login {
}
__decorate([
    class_validator_1.IsEmail({}, { message: `Property 'email' is does not contain a valid email address.` }),
    class_validator_1.IsString({ message: `Property 'email' is not type string.` }),
    class_validator_1.IsNotEmpty({ message: `Property 'email' is not available.`, }),
    __metadata("design:type", String)
], Login.prototype, "email", void 0);
__decorate([
    class_validator_1.MinLength(8, { message: `Property 'password' must have at least 8 characters.` }),
    class_validator_1.IsString({ message: `Property 'password' is not type string.` }),
    class_validator_1.IsNotEmpty({ message: `Property 'password' is not available.` }),
    __metadata("design:type", String)
], Login.prototype, "password", void 0);
exports.default = Login;
//# sourceMappingURL=auth.validation.js.map