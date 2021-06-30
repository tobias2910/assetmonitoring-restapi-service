import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";


export default class Login {
    @IsEmail({},{message: `Property 'email' is does not contain a valid email address.`})
    @IsString({message: `Property 'email' is not type string.`})
    @IsNotEmpty({message: `Property 'email' is not available.`, })
    public email: string;

    @MinLength(8, {message: `Property 'password' must have at least 8 characters.`})
    @IsString({message: `Property 'password' is not type string.`})
    @IsNotEmpty({message: `Property 'password' is not available.`})
    public password: string;
}