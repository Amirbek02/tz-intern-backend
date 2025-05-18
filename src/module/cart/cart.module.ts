import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../database/entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { NotificationEntity } from '../database/entities/notification.entity';
import { FlowerEntity } from '../database/entities/flower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, FlowerEntity, NotificationEntity]),
    AuthModule,
    NotificationModule,
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
