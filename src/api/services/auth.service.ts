import httpStatus from 'http-status';
import { getModelForClass } from "@typegoose/typegoose";

import TokenService from '../services/token.service'
import User from "../models/user.model";
import HttpException from "../utils/httpException";
import { JWTToken } from '../typings/token';
import { tokenTypes } from '../config/tokens';

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
        const token = await TokenService.generateAuthTokens(user);
        
        return token;
    }

    public async refreshToken (refreshToken: string): Promise <JWTToken> {
        try {
            const tokenDocument = await TokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
            const UserModel = getModelForClass(User);
            const user = await UserModel.findById(tokenDocument.user);

            if(!user) {
                throw new Error();
            } 

            await tokenDocument.remove();
            
            return TokenService.generateAuthTokens(user);
    
        } catch(error) {
            throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid refresh token.');
        }
    }

}

export default new AuthService();