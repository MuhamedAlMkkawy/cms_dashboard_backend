import { Injectable, NestMiddleware } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  constructor(private readonly i18nService: I18nService) {}

  use(req: any, res: any, next: () => void) {
    req.i18nService = this.i18nService;
    next();
  }
}
