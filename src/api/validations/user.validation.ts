import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUser {
    @IsString({message: `Property 'firstName' is not type string.`})
    @IsNotEmpty({message: `Property 'firstName' is not available.`})
    public firstName: string;

    @IsString({message: `Property 'lastName' is not type string.`})
    @IsNotEmpty({message: `Property 'lastName' is not available.`})
    public lastName: string;

    @IsEmail({},{message: `Property 'email' is does not contain a valid email address.`})
    @IsString({message: `Property 'email' is not type string.`})
    @IsNotEmpty({message: `Property 'email' is not available.`})
    public email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_\-%*?&])[A-Za-z\d@$!_\-%*?&]{8,10}$/, {
        message: 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character.'
    })
    @MaxLength(16, {message: `The password can have at maximum 16 characters.`})
    @MinLength(8, {message: `The password must have at least 8 characters.`})
    @IsString({message: `Property 'password' is not type string.`})
    @IsNotEmpty({message: `Property 'password' is not available.`})
    public password: string;
}