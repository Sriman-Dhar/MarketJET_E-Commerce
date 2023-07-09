import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Customer')
export class CustomerEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'Fullname', type: 'varchar', length: 150})
    name: string;
    
    @Column({name: 'Address', type: 'varchar', length: 200})
    address: string;

    @Column({name: 'Phone', type: 'varchar', length: 150})
    phone: string;

    @Column({name: 'Email', type: 'varchar', length: 150})
    email: string;

    @Column({name: 'Password', type: 'varchar', length: 150})
    password: string;

}