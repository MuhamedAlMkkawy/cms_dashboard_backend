import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Routes that don't require auth
    const openRoutes = ['/login', '/signup', '/change_password'];
    if (openRoutes.some((route) => request.path.startsWith(route))) {
      return true;
    }

    // Get authorization header
    const authHeader = request.headers.authorization;

    // If header is missing → force login
    if (!authHeader) {
      throw new UnauthorizedException('You have to login first');
    }

    // Check format: Bearer <token>
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization format');
    }

    // If token is missing → force login
    if (!token) {
      throw new UnauthorizedException(
        'Your session expired. Please login again.',
      );
    }

    // Attach token to request for later validation
    request.token = token;

    return true; // allow access, token can be validated in your service
  }
}
