import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        process.env.DB_HOST ||
        'dpg-cvmpqnbe5dus739mbvbg-a.frankfurt-postgres.render.com',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'tz_intern_user',
      password: process.env.DB_PASSWORD || 'LQNGjaiR2ivnhSFTmAqeZ9I8COsBEDeH',
      database: process.env.DB_NAME || 'tz_intern',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [UserEntity, RoleEntity],
      synchronize: false, // Лучше отключить для продакшн-среды
      migrations: ['src/migrations/*.ts'], // Настройте путь для миграций
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
