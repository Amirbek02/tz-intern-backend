import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { DatabaseModule } from './module/database/database.module';
import { DefMiddleware } from './middlewares/default.middleware';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './helpers/logger/logger.module';
import { RoleModule } from './module/role/role..module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DatabaseModule,
    LoggerModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DefMiddleware).forRoutes('*');
  }
}
