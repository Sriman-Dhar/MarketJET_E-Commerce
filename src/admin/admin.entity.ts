import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';


@Entity("Admin")
export class AdminEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({name:'fullname',type: "varchar",length: 150})
name:string;
@Column({type: "varchar",length: 150})
email:string;
@Column()
phone:number;
@Column()
password:string;
@Column()
filenames:string|null;

@OneToMany(() => ProductEntity, product => product.admin)
 products: ProductEntity[];
}



