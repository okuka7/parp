import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/domain/user';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly repository: AuthRepository) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user.id);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, payload: User | null) => void,
  ): Promise<any> {
    try {
      const user = await this.repository.findUserById(payload);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
