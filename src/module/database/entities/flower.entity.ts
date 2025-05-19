import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flower')
export class FlowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('jsonb', { nullable: true })
  lighting: {
    requirements: string;
    importance: string;
    advice: string;
  };

  @Column('jsonb', { nullable: true })
  watering: {
    amount: string;
    importance: string;
    advice: string;
  };

  @Column('jsonb', { nullable: true })
  fertilization: {
    frequency: string;
    importance: string;
    advice?: string;
  };

  @Column('text', { array: true, nullable: true })
  avoid: string[];

  @Column()
  imageUrl: string;

  @Column()
  category: string;

  @Column()
  wateringFrequency: number;

  @Column()
  waterAmountMlPerDay: number;
}
