import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { initSession } from './lib/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSession(app);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
