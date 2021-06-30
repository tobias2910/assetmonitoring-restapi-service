"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_1 = __importDefault(require("http-status"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const morgan_1 = require("./config/morgan");
const rateLimiter_1 = require("./config/rateLimiter");
const httpException_1 = __importDefault(require("./utils/httpException"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const v1_1 = require("./routes/v1");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./config/passport"));
class App {
    constructor() {
        this.app = express_1.default();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeFallbackHandler();
        this.initializeErrorhandler();
    }
    /**
     *
     * @returns {express.Application} -
     */
    getApp() {
        return this.app;
    }
    /**
     *
     */
    initializeMiddleware() {
        // Enable the logger
        this.app.use(morgan_1.successHandler);
        this.app.use(morgan_1.errorHandler);
        // Enable security headers        
        this.app.use(helmet_1.default());
        // Enable cors
        this.app.use(cors_1.default());
        // Enable gzip compression
        this.app.use(compression_1.default());
        // Enable JSON parsing
        this.app.use(express_1.default.json());
        // Parse URL encoded request body
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Sanitize the request data
        this.app.use(xss_clean_1.default());
        this.app.use(express_mongo_sanitize_1.default());
        // Sanitize mongo
        // Enable passport
        this.app.use(passport_1.default.initialize());
        passport_1.default.use('jwt', passport_2.default);
        // Enable the limiter
        this.app.use(rateLimiter_1.generalLimiter);
    }
    /**
     *
     */
    initializeRoutes() {
        this.app.use('/api/v1', v1_1.router);
    }
    /**
     * Handles all other requests. Must stay at the end of the route chain!
     */
    initializeFallbackHandler() {
        this.app.use((req, res, next) => {
            next(new httpException_1.default(http_status_1.default.NOT_FOUND, 'Path not found.'));
        });
    }
    /**
     *
     */
    initializeErrorhandler() {
        this.app.use(errorMiddleware_1.default);
    }
}
exports.default = new App().getApp();
//# sourceMappingURL=app.js.map