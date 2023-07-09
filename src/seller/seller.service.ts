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
        return this.sellerRepo.find();
    }

    async addProduct(product): Promise<ProductEntity> {
        return this.productRepo.save(product);
    }

    async addShop(shop): Promise<ShopEntity> {
        return this.shopRepo.save(shop);
    }

    async deleteProductById(productId: number): Promise<ProductEntity[]> {
        if (!productId) {
            throw new NotFoundException('Product not found!');
            }
        else{
            await this.productRepo.delete(productId);
            console.log("deleted" + productId);
            return this.productRepo.find();      
        }
    }

    async updateProductbyId(id: number, data: ProductDTO): Promise<ProductEntity[]> {
        await this.productRepo.update(id, data);
        return this.productRepo.find();
    } 

    async updateShopbyId(id: number, data: ShopDTO): Promise<ShopEntity[]> {
        await this.shopRepo.update(id, data);
        return this.shopRepo.find();
    }

    async getProductDetails(): Promise<ProductEntity[]> {
        return this.productRepo.find();
    }

    async searchProduct(id, name): Promise<ProductEntity> {
        return this.productRepo.findOneBy({ id: id, name: name});
    }

    async signUp(data: SellerDTO): Promise<SellerEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.sellerRepo.save(data);
    }

    async signIn(data: SellerLoginDTO) {
        const userdata = await this.sellerRepo.findOneBy({email: data.email});
        if (userdata && userdata.password) {
                const match: boolean = await bcrypt.compare(data.password, userdata.password);
                console.log(match)
                return match;
            } return false; 
    }

    async updateInfo(email: string, data: SellerInfoDTO): Promise<SellerEntity> {
        await this.sellerRepo.update({email: email}, data);
        return this.sellerRepo.findOneBy({id: data.id});
    }

    async updatePass(email: string, data: SellerResetPassDTO): Promise<SellerEntity> {
        await this.sellerRepo.update({email: email}, data);
        return this.sellerRepo.findOneBy({id: data.id});
    }
    
}
