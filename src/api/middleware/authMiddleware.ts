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
                res.locals.userRole = user._doc.role;
                next ();
            })(req, res, next);
    }
}

export function validatePermissions (requiredRole: string): RequestHandler {
    return(req: Request, res: Response, next: NextFunction) => {
        if (res.locals.userRole !== requiredRole) {
            next (new httpException(httpStatus.FORBIDDEN, 'You are not authorized to use this endpoint.'))
        }
        next();
    }
}