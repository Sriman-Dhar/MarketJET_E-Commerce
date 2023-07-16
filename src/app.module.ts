import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'admin',
     database: 'Commerce',
     autoLoadEntities: true,
     synchronize: true,
     
     } ),
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
