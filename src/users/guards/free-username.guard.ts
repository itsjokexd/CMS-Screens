import { Injectable, CanActivate, ExecutionContext, BadRequestException, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository, Not } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FreeUsernameGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRepo = getRepository(User);
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reqUsername = request.body.username;      

    const sameEmailUser = await userRepo.findOne({ where:{username:reqUsername, id: Not(user.id)} });
    if (sameEmailUser != null) {
      throw new BadRequestException(`Username ${reqUsername} already exists`);
    }

    return true;
  }
}