import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
// REVU: UserOwnerGuard
export class DeleteUsersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reqUserId = request.params.id;    
    
    if (reqUserId == user.id) {
      return true;
    }
    else throw new BadRequestException("You cannot delete other users");
  }
}