import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 2002,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'amir',
      database: process.env.DB_NAME || 'tz-intern',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [UserEntity, RoleEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
