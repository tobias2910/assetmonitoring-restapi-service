import { Request, Response,  NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import httpException from '../utils/httpException';

export function authorizeUser (): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate('jwt', {session: false}, (err, user, info) => { 
                if (err || !user || info) {
                    next (new httpException(httpStatus.UNAUTHORIZED, 'You are not authenticated. Please provide your bearer token.'));
                }
                next ();
            })(req, res, next);
    }
}
