"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const config_1 = __importDefault(require("./api/config/config"));
const app_1 = __importDefault(require("./api/app"));
const logger_1 = require("./api/config/logger");
let server;
// Connect to mongoDB and activate the server listener
typegoose_1.mongoose.connect(`mongodb://${config_1.default.mongoDB.url}/${config_1.default.mongoDB.database}`, {
    auth: {
        authSource: 'admin'
    },
    user: config_1.default.mongoDB.username,
    pass: config_1.default.mongoDB.password,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger_1.logger.info('Connected to mongoDB');
    server = app_1.default.listen(config_1.default.port, () => {
        logger_1.logger.info(`Server running on port ${config_1.default.port} in mode '${app_1.default.get('env')}'`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.logger.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.logger.info(error);
    exitHandler();
};
// Handle exceptions
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
// Handle the Terminate signal
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map