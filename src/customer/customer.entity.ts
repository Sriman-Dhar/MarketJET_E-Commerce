import { ProductEntity } from "src/product/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Customer')
export class CustomerEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username', type: 'varchar', length: 150})
    name: string;
    
    @Column({name: 'Address', type: 'varchar', length: 200})
    address: string;

    @Column({name: 'Phone', type: 'varchar', length: 150})
    phone: number;

    @Column({name: 'Email', type: 'varchar', length: 150})
    email: string;

    @Column({name: 'Password', type: 'varchar', length: 150})
    password: string;

    @Column({name: 'Profile Image'})
    filenames: string;

    @ManyToMany(() => ProductEntity, product => product.customer)
    product: ProductEntity;

}