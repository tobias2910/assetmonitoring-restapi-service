import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

import authService from '../services/auth.service';

export default class AuthController {

    public async login (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const user = await authService.loginUser(req.body.email, req.body.password);
            const token = await authService.generateJWTToken(user);

            res.status(httpStatus.ACCEPTED).json(token);
        } catch (error) {
            next(error);
        }
    }
}