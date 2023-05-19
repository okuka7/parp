import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  MultiProvider,
  Provider,
  ValueProvider,
} from './provider.interface';

export function ExpandProvider(
  providers: Array<Provider | MultiProvider>,
): Array<Provider> {
  return providers
    .flatMap(mapToClassProvider)
    .flatMap(mapToValueProvider)
    .flatMap(mapToFactoryProvider)
    .flatMap(mapToExistingProvider)
    .map(validateProvider);
}

const mapToClassProvider = <T = any>(
  provider: MultiProvider<T> | Provider<T>,
): Provider<T> | ClassProvider<T>[] | MultiProvider<T> => {
  if ('useClass' in provider && Array.isArray(provider.provide)) {
    const { useClass, scope, inject, durable } = provider;
    return provider.provide.map<ClassProvider<T>>((provide) => {
      return {
        provide,
        useClass,
        scope,
        inject,
        durable,
      };
    });
  }
  return provider;
};

const mapToValueProvider = <T = any>(
  provider: MultiProvider<T> | Provider<T>,
): Provider<T> | ValueProvider<T>[] | MultiProvider<T> => {
  if ('useValue' in provider && Array.isArray(provider.provide)) {
    const { useValue, inject } = provider;
    return provider.provide.map<ValueProvider<T>>((provide) => {
      return {
        provide,
        useValue,
        inject,
      };
    });
  }
  return provider;
};

const mapToFactoryProvider = <T = any>(
  provider: MultiProvider<T> | Provider<T>,
): Provider<T> | FactoryProvider<T>[] | MultiProvider<T> => {
  if ('useFactory' in provider && Array.isArray(provider.provide)) {
    const { useFactory, inject, scope, durable } = provider;
    return provider.provide.map<FactoryProvider<T>>((provide) => {
      return {
        provide,
        useFactory,
        inject,
        scope,
        durable,
      };
    });
  }
  return provider;
};

const mapToExistingProvider = <T = any>(
  provider: MultiProvider<T> | Provider<T>,
): Provider<T> | ExistingProvider<T>[] | MultiProvider<T> => {
  if ('useExisting' in provider && Array.isArray(provider.provide)) {
    const { useExisting } = provider;
    return provider.provide.map<ExistingProvider<T>>((provide) => {
      return {
        provide,
        useExisting,
      };
    });
  }
  return provider;
};

const validateProvider = <T = any>(
  provider: MultiProvider<T> | Provider<T>,
): Provider<T> => {
  if (!('provide' in provider) || Array.isArray(provider.provide)) {
    throw new Error(
      `Invalid provider ${JSON.stringify(
        provider,
      )}. Please provide useClass, useValue, useFactory or useExisting`,
    );
  }
  return provider as Provider<T>;
};
