import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { ComponentsModule } from 'src/components/components.module';
import { PagesModule } from 'src/pages/pages.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [ProjectsModule, ComponentsModule, PagesModule],
})
export class StatisticsModule {}
