import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefId } from 'src/decorators/ref.decorator';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { loginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: CustomLogger,
  ) {}

  @Post('login')
  async login(@Body() userDto: loginDto, @RefId() refId: string) {
    this.logger.info(`[START] login in site`, refId);
    try {
      const user = await this.authService.login(userDto, refId);
      return user;
    } catch (error) {
      this.logger.error(
        `[ERROR login in site ${JSON.stringify(userDto)}  `,
        refId,
      );
      throw error;
    }
  }
}
