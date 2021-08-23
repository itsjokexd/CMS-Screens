import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { getRepository } from 'typeorm';
import { Content } from '../content.entity';

@Injectable()
export class CreateContentGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reqUserId = request.body.userId;    
    
    if (reqUserId == user.id) {
      return true;
    }
    else throw new BadRequestException("You cannot add content to other users");
  }
}
