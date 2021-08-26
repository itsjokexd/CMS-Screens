import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userRepo = getRepository(User);
    const reqUserId = request.params.id;    

    const foundedUser = await userRepo.findOne(request.params.id);
    if (foundedUser == undefined) {
      throw new BadRequestException(`User with id = ${request.params.id} doesn't exist`)
    }
    
    if (reqUserId == user.id) {
      return true;
    }
    else throw new BadRequestException("You cannot delete/edit other users");
  }
}