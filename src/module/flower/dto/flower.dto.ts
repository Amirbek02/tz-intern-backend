import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FlowerDto {
  @ApiProperty({ example: 'Фикус', description: 'Название растения' })
  readonly name: string;

  @ApiProperty({
    example: 'Фикус – популярное комнатное растение...',
    description: 'Описание растения',
  })
  readonly description: string;

  @ApiProperty({
    example: 'https://example.com/ficus.jpg',
    description: 'Ссылка на изображение растения',
  })
  readonly imageUrl: string;

  @ApiProperty({ example: 'Листовые', description: 'Категория растения' })
  readonly category: string;

  @ApiProperty({
    example: 3,
    description: 'Частота полива в днях (например, раз в 3 дня)',
  })
  readonly wateringFrequency: number;

  @ApiProperty({
    example: 200,
    description: 'Рекомендуемое количество воды в мл в день',
  })
  readonly waterAmountMlPerDay: number;

  @ApiPropertyOptional({
    description: 'Информация о требованиях к освещению',
    example: {
      requirements: 'Яркий рассеянный свет',
      importance: 'Очень важно',
      advice: 'Не размещать на прямом солнце',
    },
  })
  readonly lighting?: {
    requirements: string;
    importance: string;
    advice: string;
  };

  @ApiPropertyOptional({
    description: 'Информация о поливе',
    example: {
      amount: 'Умеренный',
      importance: 'Высокая',
      advice: 'Следите, чтобы почва не пересыхала',
    },
  })
  readonly watering?: {
    amount: string;
    importance: string;
    advice: string;
  };

  @ApiPropertyOptional({
    description: 'Информация об удобрениях',
    example: {
      frequency: 'Раз в месяц',
      importance: 'Средняя',
      advice: 'Используйте жидкие удобрения для комнатных растений',
    },
  })
  readonly fertilization?: {
    frequency: string;
    importance: string;
    advice?: string;
  };

  @ApiPropertyOptional({
    description: 'Список того, чего следует избегать',
    example: ['Сквозняки', 'Прямые солнечные лучи', 'Переувлажнение'],
    type: [String],
  })
  readonly avoid?: string[];
}
