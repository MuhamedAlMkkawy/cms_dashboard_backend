import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/projects.entities';
import { PagesModule } from 'src/pages/pages.module';
import { ComponentsModule } from 'src/components/components.module';

@Module({
  imports : [TypeOrmModule.forFeature([Projects]) , PagesModule , ComponentsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports : [TypeOrmModule]
})
export class ProjectsModule {}
