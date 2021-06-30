"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path = __importStar(require("path"));
const joi_1 = __importDefault(require("joi"));
const ENV_FILE = path.join(__dirname, '../../..', '.env');
dotenv_1.config({ path: ENV_FILE });
const envConfigSchema = joi_1.default.object().keys({
    NODE_ENV: joi_1.default.string().valid('prod', 'test', 'dev').default('dev'),
    PORT: joi_1.default.number().required().description('Port Database'),
    MONGODB_URL: joi_1.default.string().required().description('MongoDB URL'),
    MONGODB_USERNAME: joi_1.default.string().required().description('MongoDB Username'),
    MONGODB_PASSWORD: joi_1.default.string().required().description('MongoDB Password'),
    MONGODB_DATABASE: joi_1.default.string().required().description('MongoDB Database')
}).unknown();
const { value: values, error } = envConfigSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(`Error during configuration: ${error.message}.`);
}
const configData = {
    env: values.NODE_ENV,
    port: values.PORT,
    mongoDB: {
        url: values.MONGODB_URL,
        username: values.MONGODB_USERNAME,
        password: values.MONGODB_PASSWORD,
        database: values.MONGODB_DATABASE,
    }
};
exports.default = configData;
//# sourceMappingURL=config.js.map