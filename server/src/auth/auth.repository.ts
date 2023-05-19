import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Auth } from './authentication';

@Injectable()
export class AuthRepository extends EntityRepository<Auth> {
  async isExist(email: string, phoneNumber: string): Promise<boolean> {
    const account = await this.findOne({ $or: [{ email }, { phoneNumber }] });
    return !!account;
  }
}
