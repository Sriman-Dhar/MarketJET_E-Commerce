import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';


@Entity("Proudct")
export class ProductEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({ name: 'Product_Name'})
name: string;
@Column({ name: 'Product_Quantity'})
quantity: number;
@Column({ name: 'Product_Price(perUnit)'})
price: number;
@Column({ name: 'Product_Image'})
filename: string;
@ManyToOne(() => AdminEntity, admin => admin.products)
admin: AdminEntity;
}