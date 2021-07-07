import { getModelForClass } from '@typegoose/typegoose';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { ObjectId } from "mongodb";

import { tokenTypes } from '../config/tokens';
import  Token from '../models/token.model';
import UserService from '../services/user.service';
import { JWTToken } from '../typings/token'
import HttpException from '../utils/httpException';

class TokenService {
    /**
     * 
     * @param {ObjectId} userId -
     * @param {moment.Moment} expiresIn -
     * @param {string} type -
     * @param {string} secret -
     */
    private generateToken (userId: ObjectId, expiresIn: moment.Moment, 
                           type: string, secret: string = 'loremIpsum90'): string {
        const payload = {
            sub: userId,
            iat: moment().unix(),
            exp: expiresIn.unix(),
            type: type
        }

        return jwt.sign(payload, secret);
    }

    /**
     * 
     * @param {string} token -  
     * @param {string} userId -  
     * @param {Moment} expires -
     * @param {string} type - 
     * @param {boolean} blacklisted -  
     * @returns 
     */
    private async saveToken (token: string, userId: string, 
                      expires: moment.Moment, type: string, blacklisted: boolean = false): Promise<any> {
        const TokenModel = getModelForClass(Token);
        const tokenDoc = await TokenModel.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted
        })

        return tokenDoc;
    }

    /**
     * 
     * @param token 
     * @param type 
     * @returns 
     */
    public async verifyToken (token: string, type: string) {
        const payload: any = jwt.verify(token, 'loremIpsum90');
        const TokenModel = getModelForClass(Token);
        const tokenDoc = await TokenModel.findOne({ token, type, user: payload.sub, blacklisted: false});
        if (!tokenDoc) {
            throw new Error ('Token not found');    
        }

        return tokenDoc;
    }

    /**
     * 
     * @param user 
     * @returns 
     */
    public async generateAuthTokens (user: any): Promise<JWTToken> {
        const accessTokenExpires = moment().add(30, 'minutes');
        const accessToken = this.generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

        const refreshTokenExpires = moment().add(1, 'days');
        const refreshToken = this.generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
        await this.saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate()
            }, 
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate()
            }
        };
    }

    /**
     * 
     * @param {string} email - 
     * @returns 
     */
    public async generateResetPasswordToken (email: string) {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
          throw new HttpException(httpStatus.NOT_FOUND, 'No users found with this email');
        }
        const expires = moment().add(30, 'minutes');
        const resetPasswordToken = this.generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
        await this.saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);

        return resetPasswordToken;
      };
    
} 

export default new TokenService();