import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);
  async canActivate(context: ExecutionContext) {
    const can = await super.canActivate(context);

    if (can) {
      const request = context.switchToHttp().getRequest();
      this.logger.log(`User ${request.user.email} is authenticated`);
      await super.logIn(request);
    }

    return true;
  }
}
