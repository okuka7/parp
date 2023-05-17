import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DecoratorRegister } from './decorator/decorator.register';
import { BasePrismaService } from './prisma/base-prisma.service';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [BasePrismaService, DecoratorRegister],
  exports: [BasePrismaService, DecoratorRegister],
})
export class CommonModule {}
