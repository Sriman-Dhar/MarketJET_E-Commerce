import { SellerEntity } from "src/seller/seller.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Shop")
export class ShopEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "Shop_Name"})
    name: string;

    @Column({ name: "Shop_Address"})
    address: string;

    @Column({ name: "Shop_Phone"})
    phone: number;

    @ManyToOne(() => SellerEntity, seller => seller.shop)
    seller: SellerEntity;
    
}
