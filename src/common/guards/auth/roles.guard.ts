import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/module/auth/auth.service';
import { IS_PUBLIC_KEY, Roles } from 'src/common/decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  [x: string]: any;
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const IsPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    console.log('IsPublic', IsPublic);
    if (IsPublic) {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );

    const accessRoles: boolean = this.authService.matchRoles(
      requiredRoles,
      user.roles,
    );

    if (!accessRoles) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}
