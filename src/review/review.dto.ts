import { IsEmail, IsNumber, IsString } from 'class-validator';

export class ReviewDTO {

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
  
}