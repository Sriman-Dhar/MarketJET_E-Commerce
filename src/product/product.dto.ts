import { IsNumber, IsString } from "class-validator";

export class ProductDTO {
    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;

    @IsString()
    filename: string;
}