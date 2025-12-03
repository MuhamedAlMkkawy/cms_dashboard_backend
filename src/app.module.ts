import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './projects/entities/projects.entities';
import { ConfigModule } from '@nestjs/config';

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
      entities: [
        Projects
      ],
    }),
    ProjectsModule ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
