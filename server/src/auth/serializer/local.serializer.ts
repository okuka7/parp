import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly repository: AuthRepository) {
    super();
  }

  serializeUser(auth: any, done: (err: Error | null, auth: any) => void): any {
    done(null, auth.userId);
  }

  async deserializeUser(
    payload: string,
    done: (err: Error | null, payload: string | null) => void,
  ): Promise<any> {
    try {
      const auth = await this.repository.findOneOrFail({ userId: payload });
      done(null, auth.userId);
    } catch (err) {
      done(err, null);
    }
  }
}
