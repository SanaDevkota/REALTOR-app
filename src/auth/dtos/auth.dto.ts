import { UserType } from "@prisma/client";
import { IsEmail, IsNotEmpty, Matches, IsString, MaxLength, MinLength, IsEnum, IsOptional } from "class-validator";


export class SignupDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    // @Matches(Constants.NEPAL_PHO NE_REGEX)
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;


    @MaxLength(200)
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    productKey?: string;
}

export class LoginDTO {

    // generate email and password
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    password: string;
}


export class GenerateProductKeyDTO {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsEnum(UserType)
    @IsString()
    @IsNotEmpty()
    userType: UserType;
}