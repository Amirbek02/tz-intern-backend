import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { FlowerEntity } from './entities/flower.entity';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        process.env.DB_HOST ||
        'ep-dawn-rice-a2mu9ufw-pooler.eu-central-1.aws.neon.tech',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'neondb_owner',
      password: process.env.DB_PASSWORD || 'npg_BhAJsvz8q7EC',
      database: process.env.DB_NAME || 'neondb',

      ssl: {
        rejectUnauthorized: false,
      },
      entities: [UserEntity, RoleEntity, FlowerEntity, CartEntity],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
