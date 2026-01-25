"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
let PermissionsGuard = class PermissionsGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const session = request.session;
        const lang = request.headers['accept-language'] || 'en';
        const openRoutes = ['/login', '/signup', '/logout'];
        if (openRoutes.includes(request.path))
            return true;
        if (!session || !session.user_token) {
            throw new common_1.UnauthorizedException({
                status: 'error',
                message: lang === 'ar' ? 'يجب أن تقوم بتسجيل الدخول لتنفيذ هذا الإجراء' : 'You must be logged in to perform this action',
            });
        }
        if (request.method === 'DELETE' && session.role === 1) {
            throw new common_1.ForbiddenException({
                status: 'error',
                message: lang === 'ar' ? 'ليس لديك صلاحية لتنفيذ هذا الإجراء' : 'You do not have permission to perform this action',
            });
        }
        if ((request.method === 'POST' ||
            request.method === 'PATCH' ||
            request.path !== '/change_password') && session.role === 2) {
            throw new common_1.ForbiddenException({
                status: 'error',
                message: lang === 'ar' ? 'ليس لديك صلاحية لتنفيذ هذا الإجراء' : 'You do not have permission to perform this action',
            });
        }
        return true;
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)()
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map