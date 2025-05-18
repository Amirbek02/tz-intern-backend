import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flower')
export class FlowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  category: string;

  @Column({ type: 'int', default: 1 })
  wateringFrequency: number;

  @Column()
  waterAmountMlPerDay: number;
}
