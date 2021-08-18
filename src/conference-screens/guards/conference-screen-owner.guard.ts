import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { getRepository } from 'typeorm';
import { ConferenceScreen } from '../conference-screen.entity';

@Injectable()
export class ConferenceScreenOwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const conferenceScreenRepo = getRepository(ConferenceScreen);
      
      const request = context.switchToHttp().getRequest();
  
      try{
        await conferenceScreenRepo.findOneOrFail(request.params.id) 
      }
      catch (NotFoundException){
        throw new BadRequestException(`Conference screen with id = ${request.params.id} doesn't exist`)
      }
    
      const user = request.user; 
      const screenEventId = (await conferenceScreenRepo.findOneOrFail(request.params.id)).conferenceEventId;
      const conferenceEventRepo = getRepository(ConferenceEvent);
      const screenUserId = (await conferenceEventRepo.findOneOrFail(screenEventId)).userId;

      if (screenUserId == user.id) {
        return true;
      }
      else throw new BadRequestException("You cannot edit/delete other users conference screens");
    }
}