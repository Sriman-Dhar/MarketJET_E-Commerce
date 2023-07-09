import { IsEmail, IsNumber, IsNumberString, IsString, Matches } from "class-validator";

export class SellerDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @Matches(/^[a-zA-Z0-9]+$/)
    password: string;

    @IsNumberString()
    phone: number;

    @IsString()
    address: string;

   // @IsString()
    filenames: string;
}

export class SellerLoginDTO {
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;

}

export class SellerInfoDTO {
    
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

export class SellerResetPassDTO {
    
    id: number;

    @IsString()
    password: string;

}