import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from 'nest-keycloak-connect';
export declare class SkipAuthGuard implements CanActivate {
    private readonly reflector;
    private readonly keycloakAuthGuard;
    constructor(reflector: Reflector, keycloakAuthGuard: AuthGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
