import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class CreatePlaylistGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const conferenceScreenRepo = getRepository(ConferenceScreen);
    const conferenceEventRepo = getRepository(ConferenceEvent);
    const playlistEventId = (await conferenceScreenRepo.findOneOrFail(request.body.conferenceScreenId)).conferenceEventId;
    const playlistUserId = (await conferenceEventRepo.findOneOrFail(playlistEventId)).userId;

    if (playlistUserId == user.id) {
      return true;
    }
    else throw new BadRequestException("You cannot add playlists to other users");
  }
}
