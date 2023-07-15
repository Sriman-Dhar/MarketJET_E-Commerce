import { IsEmail, IsNumber, IsNumberString, IsString, Matches } from "class-validator";

export class customerDTO {

    //id: number;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNumberString()
    phone: number;

    @IsEmail()
    email: string;

    @Matches(/^[a-zA-Z0-9]+$/)
    password: string;

    @IsString()
    filenames: string;
}

export class customerLoginDTO {

    @IsEmail()
    email: string;

    @Matches(/^[a-zA-Z0-9]+$/)
    password: string;

}

export class CustomerDetailsDTO {
    
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    phone: number;

    @IsString()
    address: string;

   // @IsString()
    filenames: string;
}

export class CustomerResetPassDTO {
    
    id: number;

    @IsString()
    password: string;

}