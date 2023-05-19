import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DecoratorRegister } from './decorator/decorator.register';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [DecoratorRegister],
  exports: [DecoratorRegister],
})
export class CommonModule {}
