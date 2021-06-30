import { Request, Response, NextFunction } from 'express';
import RateLimit from 'express-rate-limit';
import httpStatus from 'http-status';
import HttpException from '../utils/httpException';

export const authLimiter = RateLimit ({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    handler: (req: Request, res: Response, next: NextFunction) => {
        next(new HttpException(httpStatus.TOO_MANY_REQUESTS, 'Too many requests, please try again later.'))
    }
});

export const generalLimiter = RateLimit ({
    windowMs: 5 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: false,
    handler: (req: Request, res: Response, next: NextFunction) => {
        next(new HttpException(httpStatus.TOO_MANY_REQUESTS, 'Too many requests, please try again later.'))
    }
});

export const registerLimiter = RateLimit ({
    windowMs: 30 * 60 * 1000,
    max: 1,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
    handler: (req: Request, res: Response, next: NextFunction) => {
        next(new HttpException(httpStatus.TOO_MANY_REQUESTS, 'You can only register a new user every 30 minutes.'))
    }
});