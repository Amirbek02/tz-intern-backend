import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CartDto } from './dto/cart.dto';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { RefId } from 'src/decorators/ref.decorator';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logger: CustomLogger,
  ) {}
  @Get('')
  @UseGuards(JwtAuthGuard)
  getCart(@Request() req, @RefId() refId: string) {
    this.logger.info(`Get cart for user ${req.user.id}`, refId);
    try {
      const userId = req.user.id;
      console.log('getCart', userId);

      return this.cartService.getCart(userId);
    } catch (error) {
      this.logger.error(`Error getting cart ${error}`, refId);
      throw error;
    }
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  addToCart(@Body() dto: CartDto, @Request() req, @RefId() refId: string) {
    this.logger.info(`Add to cart for user ${req.user.id}`, refId);
    try {
      return this.cartService.addToCart(
        req.user.id,
        dto.productId,
        dto.quantity,
      );
    } catch (error) {
      this.logger.error(`Error adding to cart ${error}`, refId);
      throw error;
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  removeFromCart(@Body() id: number, @Request() req, @RefId() refId: string) {
    this.logger.info(`[START] delete cart flower`, refId);
    try {
      console.log('req', id);

      return this.cartService.removeFromCart(req.user.id, id, refId);
    } catch (error) {
      this.logger.error(`[ERROR] delete cart flower`, refId);
    }
  }
}
