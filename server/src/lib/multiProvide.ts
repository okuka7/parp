import { InjectionToken } from '@nestjs/common';

export type MultiProvideArgs = {
  provide: InjectionToken[];
  useClass: any;
};

export const multiProvide = ({ provide, useClass }: MultiProvideArgs) => {
  return provide.map((token) => ({
    provide: token,
    useClass,
  }));
};
