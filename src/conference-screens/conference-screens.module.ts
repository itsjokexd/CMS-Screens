import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceScreen } from './conference-screen.entity';
import { ConferenceScreensService } from './conference-screens.service';
import { ConferenceScreensController } from './conference-screens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceScreen])],
  providers: [ConferenceScreensService],
  controllers: [ConferenceScreensController],
  exports: [ConferenceScreensService]
})
export class ConferenceScreensModule {}
