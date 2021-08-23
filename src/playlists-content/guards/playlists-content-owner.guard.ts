import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { Content } from 'src/content/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { getRepository } from 'typeorm';
import { PlaylistsContent } from '../playlists-content.entity';

@Injectable()
export class PlaylistsContentOwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const playlistsContentRepo = getRepository(PlaylistsContent);
      
      const request = context.switchToHttp().getRequest();
  
      try{
        await playlistsContentRepo.findOneOrFail(request.params.id) 
      }
      catch (NotFoundException){
        throw new BadRequestException(`PlaylistsContent with id = ${request.params.id} doesn't exist`)
      }
    
    const user = request.user;
    const contentRepo = getRepository(Content);
    const contentUserId = (await contentRepo.findOneOrFail(request.body.contentId)).userId;

    const playlistRepo = getRepository(Playlist);
    const conferenceScreenRepo = getRepository(ConferenceScreen);
    const conferenceEventRepo = getRepository(ConferenceEvent);
    const conferenceScreenId = (await playlistRepo.findOneOrFail(request.body.playlistId)).conferenceScreenId;
    const eventId = (await conferenceScreenRepo.findOneOrFail(conferenceScreenId)).conferenceEventId;
    const playlistsContentUserId = (await conferenceEventRepo.findOneOrFail(eventId)).userId;

    if (contentUserId == user.id && playlistsContentUserId == user.id) {
      return true;
    }
      else throw new BadRequestException("You cannot edit/delete other users playlists content");
    }
}