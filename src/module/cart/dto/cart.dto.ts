import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор элемента корзины',
  })
  id: number;

  @ApiProperty({
    example: 5,
    description: 'ID товара (цветка), добавленного в корзину',
  })
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Количество выбранных экземпляров',
  })
  quantity: number;

  @ApiProperty({
    example: 10,
    description: 'ID пользователя, которому принадлежит корзина',
  })
  userId: number;
}
