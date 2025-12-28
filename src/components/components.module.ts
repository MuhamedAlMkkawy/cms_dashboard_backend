import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './entities/components.entities';

@Module({
  controllers: [ComponentsController],
  providers: [ComponentsService],
  imports: [TypeOrmModule.forFeature([Components])],
})
export class ComponentsModule {}
