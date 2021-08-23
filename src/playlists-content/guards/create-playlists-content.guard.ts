import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { Content } from 'src/content/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { getRepository, Not } from 'typeorm';
import { PlaylistsContent } from '../playlists-content.entity';

@Injectable()
export class CreatePlaylistsContentGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const playlistsContentRepo = getRepository(PlaylistsContent)
    // try {
    //   await playlistsContentRepo.findOneOrFail({ where:{
    //     playlistId: request.body.playlistId, order: Not(request.body.order) }});
    // }
    // catch (e) {
    //   throw new BadRequestException('Playlists content with order = ${request.body.order} already exists');
    // }
    const sameOrderContent = await playlistsContentRepo.findOne(
      { where:{
        playlistId: request.body.playlistId, order: request.body.order
      }
    })
    
    if (sameOrderContent != null ) {
      throw new BadRequestException(`Content with order = ${request.body.order} already exists in playlist ${request.body.playlistId}`);
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
    else throw new BadRequestException("You cannot add Playlists Content to other users");
  }
}
