import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) return true;

    const { user } = context.switchToHttp().getRequest();
    const { params } = context.switchToHttp().getRequest();

    if (
      user.role == 'driver' &&
      params.driverId &&
      user &&
      user.id != params.driverId
    ) {
      throw new ForbiddenException();
    }

    return requiredRole == user.role;
  }
}
