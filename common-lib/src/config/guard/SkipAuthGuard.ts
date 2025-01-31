import { Inject, Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from 'nest-keycloak-connect'; // Sử dụng AuthGuard của nest-keycloak-connect

@Injectable()
export class SkipAuthGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,
    private readonly keycloakAuthGuard: AuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const skipAuth = this.reflector.get<boolean>('skipAuth', handler);

    if (skipAuth) {
      return true; // Bỏ qua xác thực nếu có decorator SkipAuth
    }

    // Nếu không bỏ qua, gọi AuthGuard của Keycloak
    return this.keycloakAuthGuard.canActivate(context);
  }
}
