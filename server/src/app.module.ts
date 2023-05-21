import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ProfileModule } from './app/profile/profile.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { FlushMode } from '@mikro-orm/core';

@Module({
  imports: [
    ProfileModule,
    CommonModule,
    AuthModule,
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        port: configService.get<number>('DB_PORT'),
        dbName: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        clientUrl: configService.get('DATABASE_URL'),
        debug: configService.get('NODE_ENV') === 'development',
        highlighter: new SqlHighlighter(),
        persistOnCreate: true,
        autoLoadEntities: true,
        validateRequired: true,
        flushMode: FlushMode.AUTO,
        registerRequestContext: true,
        timezone: 'UTC',
        pool: {
          fifo: true,
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ClsModule.forRoot({
      global: true,
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: config.get('MAIL_FROM'),
        },
        template: {
          dir: __dirname + 'lib/template',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        inject: [ConfigService],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
