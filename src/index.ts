import { Server } from 'http';
import { mongoose } from '@typegoose/typegoose';

import ConfigData from './api/config/config';
import app from './api/app';
import { logger } from './api/config/logger';

let server: Server;

// Connect to mongoDB and activate the server listener
mongoose.connect(`mongodb://${ConfigData.mongoDB.url}/${ConfigData.mongoDB.database}`, {
    authSource: 'admin',
    user: ConfigData.mongoDB.username,
    pass: ConfigData.mongoDB.password,
}).then(() => {
    logger.info('Connected to mongoDB');
    server = app.listen(ConfigData.port, () => {
        logger.info(`Server running on port ${ConfigData.port} in mode '${app.get('env')}'`);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        })
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error: Error) => {
    logger.info(error);
    exitHandler();
}

// Handle exceptions
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// Handle the Terminate signal
process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
    process.exit(1);
});