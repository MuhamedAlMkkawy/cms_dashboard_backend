import { CanActivate, ExecutionContext } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
export declare class AuthGuard implements CanActivate {
    private readonly i18n;
    constructor(i18n: I18nService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
