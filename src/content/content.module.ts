import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentService],
  controllers: [ContentController],
  exports: [ContentService]
})
export class ContentModule {}
