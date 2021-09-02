import { getModelForClass } from '@typegoose/typegoose';
import httpStatus from 'http-status';
import User from '../models/user.model';
import HttpException from '../utils/httpException';
import ApiKey from 'uuid-apikey';

class UserService {

    /**
     * 
     * @param userBody 
     * @returns 
     */
    public async createNewUser (userBody: any): Promise <any> {
        const UserModel = getModelForClass(User);
        if (await UserModel.isEmailTaken(userBody.email)) {
            throw new HttpException(httpStatus.BAD_REQUEST, 'E-Mail is already taken');
        }

        const apiKey = ApiKey.create();
        userBody.apiKey = apiKey.apiKey;

        const user = await UserModel.create(userBody);
        return user;
    } 

    /**
     * 
     * @param id 
     * @returns 
     */
    public async getUserById (id: string) {
        const UserModel = getModelForClass(User);
        const user = UserModel.findById(id);

        return user;
    }

    /**
     * 
     * @param {string} mail -  
     * @returns 
     */
    public async getUserByEmail (mail: string) {
        const UserModel = getModelForClass(User);
        const user = UserModel.findOne({ mail });

        return user;
    }
    

}

export default new UserService();