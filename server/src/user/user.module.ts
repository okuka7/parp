import { Module } from '@nestjs/common';
import { LoadUserPrismaAdapter } from './adapter/outgoing/load-user.prisma.adapter';
import { UpdateUserPrismaAdapter } from './adapter/outgoing/update-user.prisma.adapter';

@Module({
  providers: [UpdateUserPrismaAdapter, LoadUserPrismaAdapter],
})
export class UserModule {}
