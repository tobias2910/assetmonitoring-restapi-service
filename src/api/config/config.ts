import { config } from 'dotenv';
import * as path from 'path';
import Joi from 'joi';
import { ConfigData } from '../typings/config';
import value from 'xss-clean';

const ENV_FILE = path.join(__dirname, '../../..', '.env');
config( {path: ENV_FILE} );

const envConfigSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('prod', 'test', 'dev').default('dev'),
    PORT: Joi.number().required().description('Port Database'),
    CERT_PASSPHRASE: Joi.string().required().description('Cert Passphrase'),
    JWT_SECRET: Joi.string().required().description('JWTSecret'),
    MONGODB_URL: Joi.string().required().description('MongoDB URL'),
    MONGODB_USERNAME: Joi.string().required().description('MongoDB Username'),
    MONGODB_PASSWORD: Joi.string().required().description('MongoDB Password'),
    MONGODB_DATABASE: Joi.string().required().description('MongoDB Database'),
    MONGODB_ASSET_COLLECTION: Joi.string().required().description('MongoDB Asset Collection'),
    MONGODB_ANALYTIC_COLLECTION: Joi.string().required().description('MongoDB Analysis Collection'),
    REDIS_HOST: Joi.string().required().description('Redis Host'),
    REDIS_PORT: Joi.number().required().description('Redis Port'),
    RATE_LIMITER: Joi.number().required().description('Rate Limiter')
}).unknown();

const {value: values, error} = envConfigSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
    throw new Error (`Error during configuration: ${error.message}.`);
}

const configData: ConfigData = {
    env: values.NODE_ENV,
    port: values.PORT,
    certPassphrase: values.CERT_PASSPHRASE,
    rateLimiter: values.RATE_LIMITER,
    jwtSecret: values.JWT_SECRET,
    bearer: {
        accessExpire: values.ACCESS_TOKEN_MINUTES,
        refreshExpire: values.REFRESH_TOKEN_DAYS 
    },
    mongoDB: {
        url: values.MONGODB_URL,
        username: values.MONGODB_USERNAME,
        password: values.MONGODB_PASSWORD,
        database: values.MONGODB_DATABASE,
        assetCollection: values.MONGODB_ASSET_COLLECTION,
        analysisCollection: values.MONGODB_ANALYTIC_COLLECTION
    },
    redis: {
        host: values.REDIS_HOST,
        port: values.REDIS_PORT
    }
};

export default configData;