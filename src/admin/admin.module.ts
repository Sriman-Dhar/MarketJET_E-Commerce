import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminAdress, AdminEntity, AdminProfile } from "./admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "../product/product.entity";



@Module({
    imports: [ TypeOrmModule.forFeature([AdminEntity, AdminProfile, AdminAdress, ProductEntity]),
      
  ],
    controllers: [AdminController],
    providers: [AdminService],
  })
  export class AdminModule {}