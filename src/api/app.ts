import cors from 'cors';
import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import { errorHandler, successHandler } from './config/morgan';
import { generalLimiter } from './config/rateLimiter';

import HttpException from './utils/httpException';
import exceptionMiddleware from './middleware/errorMiddleware';
import {router} from './routes/v1';
import passport from 'passport';
import jwtStrategy, {PassportAPIKey} from './config/passport';

class App {
    private app: express.Application;

    constructor () {
        this.app = express ();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeFallbackHandler();
        this.initializeErrorhandler()
    }

    /**
     * 
     * @returns {express.Application} - 
     */
    public getApp(): express.Application {
        return this.app;
    }

    /**
     * 
     */
    private initializeMiddleware() {
        // Enable security headers        
        this.app.use(helmet());
        // Enable the logger
        this.app.use(successHandler);
        this.app.use(errorHandler);
        // Enable cors
        this.app.use(cors());
        // Enable gzip compression
        this.app.use(compression())
        // Enable JSON parsing
        this.app.use(express.json());
        // Parse URL encoded request body
        this.app.use(express.urlencoded({ extended: true }));
        // Sanitize the request data
        this.app.use(xss());
        // Sanitize mongo
        this.app.use(mongoSanitize());
        // Enable passport
        this.app.use(passport.initialize());
        passport.use('jwt', jwtStrategy)
        passport.use('apiKey', new PassportAPIKey().apiKeyStrategy)
        // Enable the limiter
        this.app.use(generalLimiter);
    }

    /**
     * 
     */
    private initializeRoutes() {
        this.app.use('/api/v1', router);
    }

    /**
     * Handles all other requests. Must stay at the end of the route chain!
     */
    private initializeFallbackHandler() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new HttpException(httpStatus.NOT_FOUND, 'Path not found.'));
        });
    }

    /**
     * 
     */
    private initializeErrorhandler() {
        this.app.use(exceptionMiddleware);
    }
}

export default new App().getApp();