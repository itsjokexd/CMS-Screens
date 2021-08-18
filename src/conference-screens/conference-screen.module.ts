import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceScreen } from './conference-screen.entity';
import { ConferenceScreensService } from './conference-screen.service';
import { ConferenceScreensController } from './conference-screen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceScreen])],
  providers: [ConferenceScreensService],
  controllers: [ConferenceScreensController],
  exports: [ConferenceScreensService]
})
export class ConferenceScreensModule {}
