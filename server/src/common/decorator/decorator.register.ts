import { EntityManager, FlushMode } from '@mikro-orm/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  DiscoveryService,
  MetadataScanner,
  ModuleRef,
  Reflector,
} from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
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
    const em = this.moduleRef.get(EntityManager);
    return async function (...args: any[]) {
      em.setFlushMode(FlushMode.COMMIT);
      try {
        em.getContext().begin();
        const result = await method.apply(this, args);
        await em.flush();
        await em.commit();
        return result;
      } catch (e) {
        await em.rollback();
        throw e;
      }
    };
  }
}
