import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({ example: 1, description: 'ID уведомления или лога полива' })
  id: number;

  @ApiProperty({
    example: 5,
    description: 'ID записи в корзине (связанной с растением)',
  })
  cartId: number;

  @ApiProperty({
    example: '2025-05-19T12:00:00.000Z',
    description: 'Дата и время полива растения (автоматически создаётся)',
  })
  wateredAt: Date;

  @ApiProperty({
    example: false,
    description: 'Было ли отправлено уведомление пользователю',
  })
  isNotified: boolean;
}
