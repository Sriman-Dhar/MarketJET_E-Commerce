import { Module } from '@nestjs/common';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [SellerModule, TypeOrmModule.forRoot (
    {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Database',
        database: 'Commerce',
        autoLoadEntities: true,
        synchronize: true,
    }),],

    controllers: [],
    providers: [],
})

export class AppModule {}
