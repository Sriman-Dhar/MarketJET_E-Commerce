import { ProductEntity } from "src/product/product.entity";
import { ShopEntity } from "src/shop/shop.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Seller")
export class SellerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'Fullname', type: 'varchar', length: 200})
    name: string;

    @Column({name: 'email', type: 'varchar', length: 100})
    email: string;

    @Column({name: 'Password', type: 'varchar', length: 100})
    password: string;

    @Column({name: 'Contact Info'})
    phone: number;

    @Column({name: 'Address'})
    address: string;

    @Column({name: 'Profile Image'})
    filenames: string;

    @ManyToMany(() => ProductEntity, product => product.seller)
    product: ProductEntity;

    @OneToMany(() => ShopEntity, shop => shop.seller)
    shop: ShopEntity;
}