import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { getRepository } from 'typeorm';
//  REVU: поправить директории(guards/guards)
@Injectable()
export class ConferenceEventOwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const conferenceEventRepo = getRepository(ConferenceEvent);
      
      const request = context.switchToHttp().getRequest();
  
      // REVU: Переписать try catch
      try{
        await conferenceEventRepo.findOneOrFail(request.params.id) 
      }
      catch (NotFoundException){
        throw new BadRequestException(`Conference event with id = ${request.params.id} doesn't exist`)
      }
    
      const user = request.user; 
      const eventUserId = (await conferenceEventRepo.findOneOrFail(request.params.id)).userId;

      if (eventUserId == user.id) {
        return true;
      }
      else throw new BadRequestException("You cannot edit/delete other users conference events");
    }
}