import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ProductEntity } from "../product/product.entity";
import { ProductDTO } from "../product/product.dto";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>
    ) { }
    async getIndex(): Promise<AdminEntity[]> {
        return this.adminRepo.find();
    }
    async getAdminById(id: number): Promise<AdminEntity> {
            return this.adminRepo.findOneBy({ id });
    }

    async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ id: id, name: name });
    }

    async addAdmin(data: AdminDTO): Promise<AdminEntity> {
        return this.adminRepo.save(data);
    }

    async updateAdminById(id: number, data: AdminUpdateDTO): Promise<AdminEntity>{
        await this.adminRepo.update(id, data);
        return this.adminRepo.findOneBy({ id });
    }

    async deleteAdmin(id: number): Promise<AdminEntity[]> {
        await this.adminRepo.delete(id);
        return this.adminRepo.find();
    }

    async addProduct(product): Promise<ProductEntity> {
        return this.productRepo.save(product);
    }
    async deleteProduct(id: number): Promise<ProductEntity[]> {
        await this.adminRepo.delete(id);
        return this.productRepo.find();
    }

    async updateProductById(id: number, data: ProductDTO): Promise<ProductEntity> {
        await this.productRepo.update(id, data);
        return this.productRepo.findOneBy({ id });
    }
    async getAllProducts(): Promise<ProductEntity[]> {
        return this.productRepo.find();
    }
    async getProductsByAdmin(adminid: number): Promise<AdminEntity[]> {
        return this.adminRepo.find({
            where: { id: adminid },
            relations: {
                products: true,
            },
        });
    }
    async searchProduct(id, name): Promise<ProductEntity> {
        return this.productRepo.findOneBy({ id: id, name: name});
    }
    async searchProductbyId(id): Promise<ProductEntity> {
        return this.productRepo.findOneBy({ id });
    }
    async deleteProductById(id: number): Promise<ProductEntity[]> {
        if (!id) {
            throw new NotFoundException('Product not found!');
            }
        else{
            await this.productRepo.delete(id);
            console.log("deleted" + id);
            return this.productRepo.find();      
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
    async signup(data: AdminDTO): Promise<AdminEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password,salt);
       return this.adminRepo.save(data);
    }
    async signIn(data: AdminLoginDTO) {
    const userdata= await this.adminRepo.findOneBy({email:data.email});
    const match:boolean = await bcrypt.compare(data.password, userdata.password);
    return match;
    }
    async getimagebyadminid(adminid:number) {
    const mydata:AdminDTO =await this.adminRepo.findOneBy({ id:adminid});
    console.log(mydata);
    return  mydata.filenames;
    }



}
