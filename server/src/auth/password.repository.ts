import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Password } from './password';

@Injectable()
export class PasswordRepository extends EntityRepository<Password> {}
