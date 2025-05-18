import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { CartModule } from '../cart/cart.module';
import { NotificationEntity } from '../database/entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CartEntity } from '../database/entities/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, CartEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
