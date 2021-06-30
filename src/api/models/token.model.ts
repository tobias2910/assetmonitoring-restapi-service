import { modelOptions, prop } from '@typegoose/typegoose'
import { ObjectId } from 'bson';
import { tokenTypes } from '../config/tokens';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export default class Token {
    @prop({
        required: true,
        index: true
    })
    token: string;

    @prop({
        ref: 'User',
        required: true
    })
    user: ObjectId;

    @prop({
        enum: tokenTypes,
        required: true
    })
    type: string;

    @prop({
        required: true
    })
    expires: Date;

    @prop({
        default: false
    })
    blacklisted: boolean;
}