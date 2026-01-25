import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly i18n: I18nService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const openRoutes = ['/login', '/signup', '/change_password'];

    // 🌍 detect language (header → default en)
    const lang = request.headers['accept-language']?.split(',')[0] || 'en';

    // 🔓 Public routes
    if (openRoutes.some((route) => request.path.endsWith(route))) {
      return true;
    }

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(
        await this.i18n.t('login.LOGIN_REQUIRED', { lang }),
      );
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException(
        await this.i18n.t('login.INVALID_AUTH_FORMAT', { lang }),
      );
    }

    if (!token || token === 'null' || token === 'undefined') {
      throw new UnauthorizedException(
        await this.i18n.t('login.SESSION_EXPIRED', { lang }),
      );
    }

    request.token = token;
    return true;
  }
}
