import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 } from 'uuid';
import { AuthRepository } from './auth.repository';
import { Auth as Auth } from './authentication';
import { Password } from './password';
import { PasswordRepository } from './password.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordRepository: PasswordRepository,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string) {
    const account = await this.authRepository.findOne({ email });
    if (!account) {
      return null;
    }
    const originPassword = await this.passwordRepository.findOne({
      userId: account.userId,
    });

    const isMatch = originPassword?.compare(password);

    if (!isMatch) {
      this.logger.log(`Password does not match for account ${email}`);
      return null;
    }

    return account;
  }

  async registerUser(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
  ) {
    if (await this.authRepository.isExist(email, phoneNumber)) {
      this.logger.log(`Account ${email} already exists`);
      return null;
    }

    const userId = v4();
    try {
      this.userRepository.create({
        id: userId,
      });
      const auth = Auth.create(userId, email, phoneNumber);
      this.authRepository.create(auth);
      this.passwordRepository.create(Password.create(userId, password));
      this.eventEmitter.emit('user.registered', {
        userId,
        name,
      });
      this.logger.log(`User ${email} created`);
      return auth;
    } catch (e) {
      this.logger.error(`User ${email} not created`);
      return null;
    }
  }
}
