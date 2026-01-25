import { NestMiddleware } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
export declare class I18nMiddleware implements NestMiddleware {
    private readonly i18nService;
    constructor(i18nService: I18nService);
    use(req: any, res: any, next: () => void): void;
}
