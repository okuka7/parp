import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BasePrismaService } from './common/prisma/base-prisma.service';
import { initSession } from './lib/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSession(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const prismaService = app.get(BasePrismaService);
  await prismaService.enableShutdownHooks(app);

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
