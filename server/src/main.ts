import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { initSession } from './lib/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSession(app);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('Parp API')
    .setDescription('Parp API description')
    .setVersion('0.0.1')
    .addTag('parp')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
