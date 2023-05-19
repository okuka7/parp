import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  Provider,
  ValueProvider,
  OptionalFactoryDependency,
  Scope,
  Type,
} from '@nestjs/common';

export interface Abstract<T> extends Function {
  prototype: T;
}

export type InjectionToken =
  | string
  | symbol
  | Type<any>
  | Abstract<any>
  | Function;

export interface MultiClassProvider<T = any> {
  provide: Array<InjectionToken>;
  useClass: Type<T>;
  scope?: Scope;
  inject?: never;
  durable?: boolean;
}

export interface MultiValueProvider<T = any> {
  provide: Array<InjectionToken>;
  useValue: T;
  inject?: never;
}

export interface MultiFactoryProvider<T = any> {
  provide: Array<InjectionToken>;
  useFactory: (...args: any[]) => T;
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  scope?: Scope;
  durable?: boolean;
}

export interface MultiExistingProvider<T = any> {
  provide: Array<InjectionToken>;
  useExisting: T;
}

export type MultiProvider<T = any> =
  | MultiClassProvider<T>
  | MultiValueProvider<T>
  | MultiFactoryProvider<T>
  | MultiExistingProvider<T>;

export {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  Provider,
  ValueProvider,
};
