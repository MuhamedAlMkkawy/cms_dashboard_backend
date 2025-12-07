import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Pages } from './entities/pages.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  imports : [TypeOrmModule.forFeature([Pages])],
  exports: [TypeOrmModule],
})
export class PagesModule {}
