import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from './auth.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { LocalSerializer } from './serializer/local.serializer';

@Module({
  controllers: [AuthController],
  providers: [AuthRepository, AuthService, LocalSerializer, LocalStrategy],
  imports: [PassportModule.register({ session: true })],
  exports: [AuthService],
})
export class AuthModule {}
