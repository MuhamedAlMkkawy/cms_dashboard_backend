import { Module } from '@nestjs/common';
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
import { I18nModule, I18nJsonLoader } from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      synchronize: true, // only for development
      autoLoadEntities: true,
      entities: [Projects, Pages, Components, Users],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: join(__dirname, '/locales/'),
        watch: true,
      },
    }),
    ProjectsModule,
    PagesModule,
    ComponentsModule,
    StatisticsModule,
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController, UploadsController],
  providers: [AppService, AuthService, AuthGuard],
})
export class AppModule {}
