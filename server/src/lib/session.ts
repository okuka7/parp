import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import * as passport from 'passport';

export function initSession(app: INestApplication): void {
  const configService = app.get(ConfigService);

  const host = configService.get<string>('REDIS_HOST');
  const port = configService.get<number>('REDIS_PORT');

  const client = new Redis({
    port,
    host,
  });

  app.use(
    session({
      name: 'sessionId',
      store: new (RedisStore as any)({
        client,
        prefix: 'session:',
        ttl: 30,
      }),
      secret: configService.get<string>('SESSION_SECRET') as string,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
