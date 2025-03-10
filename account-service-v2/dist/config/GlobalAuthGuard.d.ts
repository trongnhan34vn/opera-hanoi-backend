import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
export declare class GlobalAuthGuard implements CanActivate {
    private readonly reflector;
    private readonly authGuard;
    private readonly resourceGuard;
    private readonly roleGuard;
    constructor(reflector: Reflector, authGuard: AuthGuard, resourceGuard: ResourceGuard, roleGuard: RoleGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
