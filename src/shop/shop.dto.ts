import { IsNumber, IsString } from "class-validator";

export class ShopDTO {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNumber()
    phone: number;
}