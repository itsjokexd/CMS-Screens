import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceEvent } from './conference-event.entity';
import { ConferenceEventsService } from './conference-events.service';
import { ConferenceEventsController } from './conference-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceEvent])],
  providers: [ConferenceEventsService],
  controllers: [ConferenceEventsController],
  exports: [ConferenceEventsService]
})
export class ConferenceEventsModule {}
