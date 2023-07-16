import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SellerEntity } from "./seller.entity";
import { ProductEntity } from "src/product/product.entity";
import { ShopEntity } from "src/shop/shop.entity";
import { ProductDTO } from "src/product/product.dto";
import { ShopDTO } from "src/shop/shop.dto";
import { SellerDTO, SellerInfoDTO, SellerLoginDTO, SellerResetPassDTO } from "./seller.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellerService {
    constructor (
        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,

        @InjectRepository(ShopEntity)
        private shopRepo: Repository<ShopEntity>
    ){}

    async getIndex(): Promise<SellerEntity[]> {
        try{
            return this.sellerRepo.find();
        }catch{
            throw new NotFoundException();
        }
    }

    async addProduct(product): Promise<ProductEntity> {
        try{
            return this.productRepo.save(product);
        }catch{
            throw new NotFoundException();
        }
    }

    async addShop(shop): Promise<ShopEntity> {
        try{
            return this.shopRepo.save(shop);
        }catch{
            throw new NotFoundException();
        }
    }

    async deleteProductById(productId: number): Promise<ProductEntity[]> {
        try{
            if (!productId) {
                throw new NotFoundException('Product not found!');
                }
            else{
                await this.productRepo.delete(productId);
                console.log("deleted" + productId);
                return this.productRepo.find();      
            }
        }catch{
            throw new NotFoundException();
        }
    }

    async updateProductbyId(id: number, data: ProductDTO): Promise<ProductEntity[]> {
        try{
            await this.productRepo.update(id, data);
            return this.productRepo.find();
        }catch{
            throw new NotFoundException();
        }

    } 

    async updateShopbyId(id: number, data: ShopDTO): Promise<ShopEntity[]> {
        try{
            await this.shopRepo.update(id, data);
            return this.shopRepo.find();
        }catch{
            throw new NotFoundException();
        }

    }

    async getProductDetails(): Promise<ProductEntity[]> {
        try{
            return this.productRepo.find();
        }catch{
            throw new NotFoundException();
        }
    }

    async searchProduct(id, name): Promise<ProductEntity> {
        try{
            return this.productRepo.findOneBy({ id: id, name: name});
        }catch{
            throw new NotFoundException();
        }
    }

    async signUp(data: SellerDTO): Promise<SellerEntity> {
        try{
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
            return this.sellerRepo.save(data);
        }catch{
            throw new NotFoundException();
        }

    }

    async signIn(data: SellerLoginDTO) {
        try{
            const userdata = await this.sellerRepo.findOneBy({email: data.email});
            if (userdata && userdata.password) {
                    const match: boolean = await bcrypt.compare(data.password, userdata.password);
                    console.log(match)
                    return match;
                } return false; 
        }catch{
            throw new NotFoundException();
        }
    }

    async updateInfo(email: string, data: SellerInfoDTO): Promise<SellerEntity> {
        try{
            await this.sellerRepo.update({email: email}, data);
            return this.sellerRepo.findOneBy({id: data.id});
        }catch{
            throw new NotFoundException();
        }

    }

    async updatePass(email: string, data: SellerResetPassDTO): Promise<SellerEntity> {
        try{
            await this.sellerRepo.update({email: email}, data);
            return this.sellerRepo.findOneBy({id: data.id});
        }catch{
            throw new NotFoundException();
        }

    }
    
}
