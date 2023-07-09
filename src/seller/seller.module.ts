import { Controller, Module } from "@nestjs/common";
import { SellerEntity } from "./seller.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { ProductEntity } from "src/product/product.entity";
import { ShopEntity } from "src/shop/shop.entity";

@Module (
    {
        imports: [TypeOrmModule.forFeature([SellerEntity, ProductEntity, ShopEntity]),],
        controllers: [SellerController],
        providers: [SellerService],
    }
)

export class SellerModule {}