import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUserIdParam = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.id; // example, currently only returns the JWT payload ID
});
