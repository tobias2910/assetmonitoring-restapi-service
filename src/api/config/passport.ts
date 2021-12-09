import { getModelForClass } from '@typegoose/typegoose';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import bcrypt from 'bcryptjs';


import User from '../models/user.model';
import { tokenTypes } from './tokens';
import ConfigData from '../config/config'

export class PassportJWT {
    private readonly jwtOptions: StrategyOptions;
    public jwtStrategy: Strategy;

    constructor() {
        this.jwtOptions = this.defineJwtOptions(); 
        this.jwtStrategy = new Strategy(this.jwtOptions, this.jwtVerify);
    }

    /**
     * 
     * @returns {StrategyOptions} - 
     */
    private defineJwtOptions (): StrategyOptions {
        return {
            secretOrKey: ConfigData.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
    }

    /**
     * 
     * @param {any} payload -
     * @param {VerifiedCallback} next -  
     */
    private async jwtVerify (payload: any, next: VerifiedCallback): Promise <void> {
        try {
            if (payload.type !== tokenTypes.ACCESS) {
                throw new Error ('Invalid token type');
            }
            // Init the user model
            const userModel = getModelForClass(User);
            const user = await userModel.findById(payload.sub);
            if(!user) {
                return next(null, false);
            }
            next (null, user);
        } catch (error) {
            next (error, false);
        }
    } 
}

export class PassportAPIKey {
    public apiKeyStrategy: HeaderAPIKeyStrategy;

    constructor () {
        this.apiKeyStrategy = this.defineApiKeyStrategy();
    }

    private defineApiKeyStrategy() {
        return new HeaderAPIKeyStrategy({header: 'X-API-Key', prefix: ''}, false, (apiKey, next) => this.apiKeyVerify(apiKey, next));
    }

    private async apiKeyVerify (apiKey: string, next: VerifiedCallback) {
        try {
            const userModel = getModelForClass(User);
            const user = await userModel.findOne( {apiKey: apiKey});  
    
            if(!user){
                return next (null, false);
            } 
            next (null, user);
        } catch (error) {
            next (error, false);
        }
    };
}

export default new PassportJWT().jwtStrategy;