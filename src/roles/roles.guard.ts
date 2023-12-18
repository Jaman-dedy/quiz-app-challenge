import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    console.log('roles :>> ', roles);
    if (!roles || !roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role?.id;

    if (!userRole || !roles.includes(userRole)) {
      const errorMessage = 'You do not have the required role to access this resource.';
      
      throw new ForbiddenException(errorMessage);
    }

    return true;
  }
}
