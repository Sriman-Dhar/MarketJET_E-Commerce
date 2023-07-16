import { IsEmail, IsEmpty, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

export class AdminDTO {
    @IsString({ message: "invalid name" })
    @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
    name: string;

    @IsEmail({}, { message: "invalid email" })
    email: string;
    password: string;
    @IsNumberString()
    phone: number;
    @IsString()
    filenames: string;

}
export class AdminLoginDTO {
    @IsEmail({}, { message: "invalid email" })
    email: string;
    password: string;
}

export class AdminUpdateDTO {
    name: string;
    email: string;
    password: string;
}