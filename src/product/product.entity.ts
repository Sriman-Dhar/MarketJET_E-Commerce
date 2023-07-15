import { CustomerEntity } from "src/customer/customer.entity";
import { SellerEntity } from "src/seller/seller.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Product")
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'Product_Name'})
    name: string;

    @Column({ name: 'Product_Quantity'})
    quantity: number;

    @Column({ name: 'Product_Price(perUnit)'})
    price: number;

    @Column({ name: 'Product_Image'})
    filename: string;

    @ManyToMany(() => SellerEntity, seller => seller.product)
    seller: SellerEntity;

    @ManyToMany(() => CustomerEntity, customer => customer.product)
    customer: CustomerEntity;
}