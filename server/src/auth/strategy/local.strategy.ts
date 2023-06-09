import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.service.validateUser(email, password);
    if (!user) {
      return done(new UnauthorizedException(), null);
    }

    return done(null, user);
  }
}
