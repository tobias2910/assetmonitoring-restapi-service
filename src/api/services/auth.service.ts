import httpStatus from 'http-status';
import { getModelForClass } from "@typegoose/typegoose";

import TokenService from '../services/token.service'
import User from "../models/user.model";
import HttpException from "../utils/httpException";
import { JWTToken } from '../typings/token';

class AuthService {

    /**
     * 
     * @param {string} email - 
     * @param {string} password -  
     */
    public async loginUser (email: string, password: string): Promise<User> {
        const UserModel = getModelForClass(User);
        const user = await UserModel.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            throw new HttpException(httpStatus.UNAUTHORIZED, 'Incorrect mail or password.');
        }

        return user;
    }

    public async generateJWTToken (user: any): Promise <JWTToken> {
        const token = TokenService.generateAuthTokens(user);
        
        return token;
    }

}

export default new AuthService();