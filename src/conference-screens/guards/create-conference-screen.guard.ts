import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { getRepository } from 'typeorm';
import { ConferenceScreen } from '../conference-screen.entity';

@Injectable()
export class CreateConferenceScreenGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const conferenceEventRepo = getRepository(ConferenceEvent);
    const screenUserId = (await conferenceEventRepo.findOneOrFail(request.body.conferenceEventId)).userId;

    if (screenUserId == user.id) {
      return true;
    }
    else throw new BadRequestException("You cannot add conference screens to other users");
  }
}
