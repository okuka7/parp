import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Password } from './password';

@Injectable()
export class PasswordRepository extends EntityRepository<Password> {}
