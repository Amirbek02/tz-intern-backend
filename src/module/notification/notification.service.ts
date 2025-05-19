import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../database/entities/cart.entity';
import { NotificationEntity } from '../database/entities/notification.entity';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,
    @InjectRepository(NotificationEntity)
    private readonly logRepo: Repository<NotificationEntity>,
    private readonly logger: CustomLogger,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleWateringNotifications() {
    this.logger.info(`[START] handle watering notifications`, '');
    try {
      const now = new Date();
      const carts = await this.cartRepo.find({
        relations: ['flower', 'user'],
      });

      console.log('carts', carts);
      for (const cart of carts) {
        const { lastWateredAt, flower, user } = cart;
        const nextWateringDate = new Date(lastWateredAt);
        nextWateringDate.setDate(
          nextWateringDate.getDate() + flower.waterAmountMlPerDay,
        );

        if (now >= nextWateringDate) {
          // Тут можно отправить уведомление (например, через email или push)
          console.log(
            `Пора поливать ${flower.name} для пользователя #${user.id}`,
          );

          // Сохраняем лог уведомления
          await this.logRepo.save({
            cart: cart,
            wateredAt: now,
            isNotified: true,
          });

          // Обновляем дату последнего полива
          cart.lastWateredAt = now;
          await this.cartRepo.save(cart);
        }
      }
    } catch (error) {
      this.logger.error(
        `[ERROR] handle watering notifications ${JSON.stringify(error)}`,
        '',
      );
      throw error;
    }
  }

  async getNotifications(userId: number) {
    return this.logRepo.find({
      where: { cart: { user: { id: userId } } },
      relations: ['cart', 'cart.flower'],
      order: { wateredAt: 'DESC' },
    });
  }
}
