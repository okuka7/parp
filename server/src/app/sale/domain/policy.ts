import { Embeddable, Enum } from '@mikro-orm/core';

@Embeddable()
export class Policy {
  @Enum(() => LimitType)
  limitType: LimitType = LimitType.INHERIT;

  isInheritable(): boolean {
    return this.limitType === LimitType.INHERIT;
  }
}

export const LimitType = {
  INHERIT: 'INHERIT',
  INDEPENDENT: 'INDEPENDENT',
} as const;

type LimitType = (typeof LimitType)[keyof typeof LimitType];
