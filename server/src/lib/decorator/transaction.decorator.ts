import { applyDecorators, SetMetadata } from '@nestjs/common';

export const TRANSACTION = Symbol('TRANSACTION');

export function Transactional() {
  return applyDecorators(SetMetadata(TRANSACTION, true));
}
