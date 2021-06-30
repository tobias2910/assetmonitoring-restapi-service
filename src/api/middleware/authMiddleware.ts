import { Request, Response,  NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import User from '../models/user.model';
import httpException from '../utils/httpException';

export function authorizeUser (...requiredRights: string []): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate('jwt', {session: false}, (err, user, info) => { 
                if (err || !user || info) {
                    next (new httpException(httpStatus.UNAUTHORIZED, 'Not authenticated!'));
                }
                next ();
            })(req, res, next);
    }
}
