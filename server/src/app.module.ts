import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ProfileModule } from './app/profile/profile.module';

@Module({
  imports: [
    ProfileModule,
    CommonModule,
    AuthModule,
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      highlighter: new SqlHighlighter(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
