import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '../database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
