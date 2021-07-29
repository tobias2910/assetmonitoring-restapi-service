import { Request, Response, NextFunction } from 'express';
import RateLimit from 'express-rate-limit';
import httpStatus from 'http-status';
import HttpException from '../utils/httpException';
import configData from './config';

/**
 * 
 */
export const generalLimiter = RateLimit ({
    windowMs: 5 * 60 * 1000,
    max: configData.rateLimiter,
    skipSuccessfulRequests: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
        next(new HttpException(httpStatus.TOO_MANY_REQUESTS, 'Too many requests, please try again later.'))
    }
});