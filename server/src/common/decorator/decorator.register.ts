import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  DiscoveryService,
  MetadataScanner,
  ModuleRef,
  Reflector,
} from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Prisma } from '@prisma/client';
import { ClsServiceManager } from 'nestjs-cls';
import {
  BasePrismaService,
  PRISMA_TRANSACTION,
} from '../prisma/base-prisma.service';
import { TRANSACTION } from './transaction.decorator';

@Injectable()
export class DecoratorRegister implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    return this.findProviders().forEach(this.registTransactionDecorator);
  }

  private findProviders() {
    return this.discoveryService
      .getProviders()
      .filter((provider) => {
        provider.isDependencyTreeStatic();
      })
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance));
  }

  private registTransactionDecorator(provider: InstanceWrapper<any>) {
    const { instance } = provider;
    this.metadataScanner
      .getAllMethodNames(Object.getPrototypeOf(instance))
      .forEach((methodName) => {
        const isTransaction =
          this.reflector.get(TRANSACTION, instance[methodName]) ||
          this.reflector.get(TRANSACTION, instance);
        if (!isTransaction) {
          return;
        }

        const originalMethod = instance[methodName];
        instance[methodName] = this.registPrismaTransaction(originalMethod);
      });
  }

  private registPrismaTransaction(method: any) {
    const prisma = this.moduleRef.get(BasePrismaService, {
      strict: false,
    });
    return async function (...args: any[]) {
      const cls = ClsServiceManager.getClsService();
      if (cls.get(PRISMA_TRANSACTION)) {
        return method.apply(this, args);
      }
      return await cls.run(async () => {
        const result = await prisma
          .$transaction(async (tx: Prisma.TransactionClient) => {
            cls.set(PRISMA_TRANSACTION, tx);
            return await method.apply(this, args);
          })
          .finally(() => {
            cls.set(PRISMA_TRANSACTION, null);
          });
        return result;
      });
    };
  }
}
