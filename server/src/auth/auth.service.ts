import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly config: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  private hashPassword(password: string) {
    const round = parseInt(this.config.get('BCRYPT_ROUNDS') as string);
    return bcrypt.hashSync(password, round);
  }

  async validateUser(email: string, password: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      this.logger.log(`Password does not match for user ${email}`);
      return null;
    }
    return user;
  }

  async registerUser(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) {
    const hashedPassword = this.hashPassword(password);
    const user = this.repository.createUser(
      email,
      hashedPassword,
      name,
      phoneNumber,
    );
    if (!user) {
      this.logger.error(`User ${email} not created`);
      return null;
    }
    this.logger.log(`User ${email} created`);
    return user;
  }
}
