import { Request, Response,  NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';
import httpException from '../utils/httpException';

/**
 * 
 * @returns 
 */
export function authorizeUser (): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate(['jwt', 'apiKey'], {session: false}, (err, user, info) => { 
                if (err || !user || info) {
                    next (new httpException(httpStatus.UNAUTHORIZED, 'You are not authenticated. Please provide your bearer token OR your API key.'));
                } else {
                    res.locals.userRole = user._doc.role;
                }
                next ();
            })(req, res, next);
    }
}

/**
 * 
 * @param requiredRole 
 * @returns 
 */
export function validatePermissions (requiredRole: string): RequestHandler {
    return(req: Request, res: Response, next: NextFunction) => {
        if (res.locals.userRole !== requiredRole) {
            next (new httpException(httpStatus.FORBIDDEN, 'You are not authorized to use this endpoint.'))
        }
        next();
    }
}