// app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './projects/entities/projects.entities';
import { ConfigModule } from '@nestjs/config';
import { PagesModule } from './pages/pages.module';
import { Pages } from './pages/entities/pages.entities';
import { ComponentsModule } from './components/components.module';
import { Components } from './components/entities/components.entities';
import { UploadsController } from './uploads/uploads.controller';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Users } from './users/entities/users.entities';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import {
  I18nModule,
  I18nJsonLoader,
  HeaderResolver,
  QueryResolver,
  AcceptLanguageResolver,
  I18nMiddleware,
} from 'nestjs-i18n';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      synchronize: true,
      autoLoadEntities: true,
      entities: [Projects, Pages, Components, Users],
    }),

    // I18n Module - SIMPLIFIED VERSION
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(process.cwd(), 'src/i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new AcceptLanguageResolver(),
        new HeaderResolver(['x-custom-lang']),
      ],
    }),

    ProjectsModule,
    PagesModule,
    ComponentsModule,
    StatisticsModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController, UploadsController],
  providers: [
    AppService,
    AuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // global application
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
