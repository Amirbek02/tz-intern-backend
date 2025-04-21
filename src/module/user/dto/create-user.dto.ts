import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Пароль пользователя (должен быть безопасным)',
    example: 'StrongP@ssw0rd',
  })
  readonly password: string;

  @ApiProperty({
    description: 'Адрес электронной почты пользователя',
    example: 'john.doe@example.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Возраст пользователя',
    example: 25,
  })
  readonly age: number;
}
