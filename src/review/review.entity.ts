import { IsNumber, IsString } from "class-validator";
import { CustomerEntity } from "src/customer/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('review')
export class ReviewEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(() => CustomerEntity, customer => customer.reviews)
    customer: CustomerEntity;
}