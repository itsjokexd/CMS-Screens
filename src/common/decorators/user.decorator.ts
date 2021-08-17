import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserData = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  if (data) {
    return user[data];
  }

  return user;
});