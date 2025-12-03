import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/projects.entities';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports : [TypeOrmModule.forFeature([Projects])]
})
export class ProjectsModule {}
