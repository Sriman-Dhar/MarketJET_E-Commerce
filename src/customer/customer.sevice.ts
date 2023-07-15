import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerEntity } from "./customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/product/product.entity";
import { Repository } from "typeorm";
import { CustomerDetailsDTO, CustomerResetPassDTO, customerDTO, customerLoginDTO } from "./customer.dto";
import * as bcrypt from 'bcrypt';
import { ReviewEntity } from "src/review/review.entity";
import { ReviewDTO } from "src/review/review.dto";


@Injectable()
export class CustomerService {
    
    constructor (
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>,

        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,

        @InjectRepository(ReviewEntity)
        private reviewRepo: Repository<ReviewEntity>

    ) {}

    async getIndex(): Promise<CustomerEntity[]> {
        return this.customerRepo.find();
    }

    async signUp(data: customerDTO): Promise<CustomerEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.customerRepo.save(data);
    }

    async login(data: customerLoginDTO) {
        const user = await this.customerRepo.findOneBy({email: data.email});
        if (user && user.password) {
            const match:boolean = await bcrypt.compare(data.password, user.password);
            console.log(match)
            return match;
        } 
        return false;
    }

    async updateDetails(email: string, data: CustomerDetailsDTO): Promise<CustomerEntity> {
        await this.customerRepo.update({email: email}, data);
        return this.customerRepo.findOneBy({id: data.id});
    }

    async updatePass(email: string, data: CustomerResetPassDTO): Promise<CustomerEntity> {
        await this.customerRepo.update({email: email}, data);
        return this.customerRepo.findOneBy({id: data.id});
    }

    async addProduct(product): Promise<ProductEntity[]> {
        await this.productRepo.save(product);
        return this.productRepo.find();
    }

    async searchProduct(name): Promise<CustomerEntity> {
        return this.customerRepo.findOneBy({name: name});
    }

    async deleteProductByName(productName: string): Promise<ProductEntity[]> {
        if(!productName) {
            throw new NotFoundException('Product not found in cart!')
        }
        else{
            await this.productRepo.delete(productName);
            console.log("Product removed from cart!");
            return this.productRepo.find(); 
        }
    }

    async getTotalCost(): Promise<number>{
        const products = await this.productRepo.find();
    let totalCost = 0;

    for (const product of products) {
      totalCost += product.price * product.quantity;
    }

    return totalCost;
    }

    async getProductQuantity(): Promise<number>{
        const products = await this.productRepo.find();
    let productQuantity = 0;

    for (const product of products) {
        productQuantity += product.quantity;
    }

    if (!products){throw new NotFoundException('Out of stock!');}
    return productQuantity;
    }

    async submitReview(email: string, reviewData: ReviewDTO): Promise<void> {
        const customer = await this.customerRepo.findOne({ where: { email } });
      
        if (customer) {
          const review = new ReviewEntity();
          review.customer = customer;
          review.rating = reviewData.rating;
          review.comment = reviewData.comment;
      
          await this.reviewRepo.save(review);
        }
      }

}