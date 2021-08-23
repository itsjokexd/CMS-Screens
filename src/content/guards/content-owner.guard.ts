import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { getRepository } from 'typeorm';
import { Content } from '../content.entity';

@Injectable()
export class ContentOwnerGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const contentRepo = getRepository(Content);
      
      const request = context.switchToHttp().getRequest();
  
      try{
        await contentRepo.findOneOrFail(request.params.id) 
      }
      catch (NotFoundException){
        throw new BadRequestException(`Content with id = ${request.params.id} doesn't exist`)
      }
    
      const user = request.user; 
      const contentUserId = (await contentRepo.findOneOrFail(request.params.id)).userId;

      if (contentUserId == user.id) {
        return true;
      }
      else throw new BadRequestException("You cannot edit/delete other users content");
    }
}