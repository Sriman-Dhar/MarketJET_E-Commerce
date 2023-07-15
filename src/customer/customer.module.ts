import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "./customer.entity";
import { ProductEntity } from "src/product/product.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.sevice";
import { ReviewEntity } from "src/review/review.entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([CustomerEntity, ProductEntity, ReviewEntity]),],
        controllers: [CustomerController],
        providers: [CustomerService],
    }
)

export class CustomerModule {}