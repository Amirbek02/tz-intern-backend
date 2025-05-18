import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../database/entities/cart.entity';
import { Repository } from 'typeorm';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { NotificationEntity } from '../database/entities/notification.entity';
import { UserEntity } from '../database/entities/user.entity'; // если нужно
import { FlowerEntity } from '../database/entities/flower.entity';

export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
    @InjectRepository(NotificationEntity)
    private notificationRepo: Repository<NotificationEntity>,
    @InjectRepository(FlowerEntity)
    private flowerRepo: Repository<FlowerEntity>,
    private readonly logger: CustomLogger,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const existing = await this.cartRepo.findOne({
      where: { user: { id: userId }, flower: { id: productId } },
    });

    const now = new Date();

    if (existing) {
      existing.quantity += quantity;
      await this.cartRepo.save(existing);
    } else {
      const newItem = this.cartRepo.create({
        user: { id: userId },
        flower: { id: productId },
        lastWateredAt: now,
        quantity,
      });
      await this.cartRepo.save(newItem);
    }
  }

  async getCartUser() {
    return this.cartRepo.find({
      relations: ['user'],
    });
  }

  async getCart(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['flower'],
    });
  }
  async removeFromCart(userId: number, productId: number, refId: string) {
    this.logger.info(`[START] delete flowers`, refId);
    try {
      const item = await this.cartRepo.findOne({
        where: { user: { id: userId }, flower: { id: productId } },
      });

      if (item) {
        return this.cartRepo.remove(item);
      }
      return null;
    } catch (error) {
      this.logger.error(`[ERROR] delete`, refId);
      throw error;
    }
  }
}
