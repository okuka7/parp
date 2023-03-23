import secureSession from '@fastify/secure-session';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  await app.register(secureSession, {
    secret: 'asdlkfjhaslkdjghkljcxzvnklndasklfj',
    salt: 'asdldsakljhzxc',
    cookie: {
      path: '/',
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    },
  });
  await app.listen(3000);
}
bootstrap();
