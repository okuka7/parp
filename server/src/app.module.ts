import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    UserModule,
    CommonModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
