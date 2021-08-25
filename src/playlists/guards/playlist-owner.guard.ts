import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { getRepository } from 'typeorm';
import { Playlist } from '../playlist.entity';

@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const playlistRepo = getRepository(Playlist);
      
      const request = context.switchToHttp().getRequest();
  
      // REVU:
      try{
        await playlistRepo.findOneOrFail(request.params.id) 
      }
      catch (NotFoundException){
        throw new BadRequestException(`Playlist with id = ${request.params.id} doesn't exist`)
      }
    
      const user = request.user; 
      const playlistScreenId = (await playlistRepo.findOneOrFail(request.params.id)).conferenceScreenId;
      const conferenceScreenRepo = getRepository(ConferenceScreen);
      const playlistEventId = (await conferenceScreenRepo.findOneOrFail(playlistScreenId)).conferenceEventId;
      const conferenceEventRepo = getRepository(ConferenceEvent);
      const playlistUserId = (await conferenceEventRepo.findOneOrFail(playlistEventId)).userId;

      if (playlistUserId == user.id) {
        return true;
      }
      else throw new BadRequestException("You cannot edit/delete other users playlists");
    }
}