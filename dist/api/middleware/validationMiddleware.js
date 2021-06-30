"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryMiddleware = exports.validateBodyMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const httpException_1 = __importDefault(require("../utils/httpException"));
function validateBodyMiddleware(type) {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.body), { stopAtFirstError: true })
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(', ');
                next(new httpException_1.default(400, message));
            }
            else {
                next();
            }
        });
    };
}
exports.validateBodyMiddleware = validateBodyMiddleware;
function validateQueryMiddleware(type) {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.query), { stopAtFirstError: true })
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(', ');
                next(new httpException_1.default(400, message));
            }
            else {
                next();
            }
        });
    };
}
exports.validateQueryMiddleware = validateQueryMiddleware;
//# sourceMappingURL=validationMiddleware.js.map