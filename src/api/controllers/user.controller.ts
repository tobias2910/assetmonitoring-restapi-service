import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import userService from "../services/user.service";

export default class UserController {

    public async createNewUser (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const user = await userService.createNewUser(req.body);
            res.status(httpStatus.CREATED).json({ message: 'Sign Up successful!'});
        } catch (error) {
            next(error);
        }
    }

}