import { modelOptions, pre, prop, ReturnModelType } from '@typegoose/typegoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import roles from '../config/roles';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
@pre <User> ('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})
export default class User {
    @prop({
            required: true, 
            trim: true
         })
    public firstName: string;

    @prop({
        required: true, 
        trim: true
     })
    public lastName: string;

    @prop({
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: { 
                validator: (val: string) => validator.isEmail(val),
                message: 'Invalid email'
            }
        })
    public email: string;

    @prop({
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 16,
            validate: {
                validator: (val: string) => (val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_\-%*?&])[A-Za-z\d@$!_\-%*?&]{8,10}$/)),
                message: 'Password must contain at least one letter and one number'
            }
         })
    public password: string;

    @prop({
        trim: true
    })
    public apiKey: string;

    @prop({
            enum: roles.getRoles(),
            default: roles.getRoles()[0],
          })
    public role: string;

    @prop({
        default: false
    })
    public isEmailVerified: boolean;

    /**
     * 
     * @param {User} this 
     * @returns {Promise<boolean>} - 
     */
    public static async isEmailTaken (this: ReturnModelType<typeof User>, 
                                      email: string, excludeUserId?: string): Promise <boolean> {
        const user = await this.findOne( {email, _id: { $ne: excludeUserId}} );

        return !!user;
    }

    /**
     * 
     * @param {string} password -
     * @returns {Promise <boolean>} - 
     */
    public async isValidPassword (password: string): Promise <boolean> {
        const user = this;
        const compare = bcrypt.compare(password, user.password);

        return compare;
    }
}
