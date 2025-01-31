import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authGuard: AuthGuard,
    private readonly resourceGuard: ResourceGuard,
    private readonly roleGuard: RoleGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra nếu có decorator `skipAuth` thì bỏ qua xác thực
    const handler = context.getHandler();
    const skipAuth = this.reflector.get<boolean>('skipAuth', handler);

    if (skipAuth) {
      return true; // Bỏ qua xác thực
    }

    // Nếu không bỏ qua, kiểm tra các guard còn lại
    const authResult = await this.authGuard.canActivate(context);
    if (!authResult) return false;

    const resourceResult = await this.resourceGuard.canActivate(context);
    if (!resourceResult) return false;

    return await this.roleGuard.canActivate(context);

    // Nếu tất cả đều thành công
  }
}
