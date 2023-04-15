import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionAuthGuard extends AuthGuard('session') {
  async canActivate(context: ExecutionContext) {
    const can = (await super.canActivate(context)) as boolean;

    if (can) {
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }

    return can;
  }
}
