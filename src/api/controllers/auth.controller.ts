import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

import authService from '../services/auth.service';

export default class AuthController {

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async login (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const user = await authService.loginUser(req.body.email, req.body.password);
            const token = await authService.generateJWTToken(user);

            res.status(httpStatus.OK).json(token);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async refresh (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const token = await authService.refreshToken(req.body.refreshToken);

            res.status(httpStatus.OK).json(token);
        } catch (error) {
            next(error);
        }
    }
}