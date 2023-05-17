import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ClsService } from 'nestjs-cls';
import { BasePrismaService, PRISMA_TRANSACTION } from './base-prisma.service';

@Injectable()
export class PrismaService {
  constructor(
    private readonly prismaService: BasePrismaService,
    private readonly cls: ClsService,
  ) {}

  get prisma(): PrismaClient | Prisma.TransactionClient {
    const tx = this.cls.get(PRISMA_TRANSACTION);
    if (this.cls.isActive() && tx) return tx;
    return this.prismaService;
  }
}
