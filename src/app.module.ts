import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

@Module({
    imports: [CustomerModule, TypeOrmModule.forRoot (
    {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'Commerce',
        autoLoadEntities: true,
        synchronize: true,
    }) ],

    controllers: [],
    providers: [],
})

export class AppModule {}
