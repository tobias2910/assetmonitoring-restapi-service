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
exports.CreateUser = void 0;
const class_validator_1 = require("class-validator");
class CreateUser {
}
__decorate([
    class_validator_1.IsString({ message: `Property 'firstName' is not type string.` }),
    class_validator_1.IsNotEmpty({ message: `Property 'firstName' is not available.` }),
    __metadata("design:type", String)
], CreateUser.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString({ message: `Property 'lastName' is not type string.` }),
    class_validator_1.IsNotEmpty({ message: `Property 'lastName' is not available.` }),
    __metadata("design:type", String)
], CreateUser.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: `Property 'email' is does not contain a valid email address.` }),
    class_validator_1.IsString({ message: `Property 'email' is not type string.` }),
    class_validator_1.IsNotEmpty({ message: `Property 'email' is not available.` }),
    __metadata("design:type", String)
], CreateUser.prototype, "email", void 0);
__decorate([
    class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_\-%*?&])[A-Za-z\d@$!_\-%*?&]{8,10}$/, {
        message: 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character.'
    }),
    class_validator_1.MaxLength(16, { message: `The password can have at maximum 16 characters.` }),
    class_validator_1.MinLength(8, { message: `The password must have at least 8 characters.` }),
    class_validator_1.IsString({ message: `Property 'password' is not type string.` }),
    class_validator_1.IsNotEmpty({ message: `Property 'password' is not available.` }),
    __metadata("design:type", String)
], CreateUser.prototype, "password", void 0);
exports.CreateUser = CreateUser;
//# sourceMappingURL=user.validation.js.map