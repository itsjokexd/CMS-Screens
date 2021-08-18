import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class CreateConferenceEventGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const conferenceEventRepo = getRepository(ConferenceEvent);
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reqUserId = request.body.userId;    
    
    if (reqUserId == user.id) {
      return true;
    }
    else throw new BadRequestException("You cannot add conference events to other users");
  }
}
