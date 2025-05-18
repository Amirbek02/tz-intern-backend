import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('watering_log')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.id, { onDelete: 'CASCADE' })
  cart: CartEntity;

  @CreateDateColumn()
  wateredAt: Date;

  @Column({ default: false })
  isNotified: boolean; // Было ли отправлено уведомление
}
