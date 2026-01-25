"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        response.removeHeader('ETag');
        response.removeHeader('Last-Modified');
        response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
        response.status(200);
        const langHeader = request.headers['accept-language'] || 'en';
        const lang = langHeader.toLowerCase().includes('ar') ? 'ar' : 'en';
        const page = parseInt(request.query.page, 10) || 1;
        const limit = parseInt(request.query.limit, 10) || 15;
        const messages = {
            en: 'Data sent successfully',
            ar: 'تم إرسال البيانات بنجاح',
        };
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data?.status && data?.data !== undefined) {
                return data;
            }
            if (Array.isArray(data)) {
                const totalItems = data.length;
                const totalPages = Math.ceil(totalItems / limit);
                const start = (page - 1) * limit;
                const end = start + limit;
                const paginatedData = data.slice(start, end);
                return {
                    statusCode: 200,
                    status: 'success',
                    message: messages[lang],
                    data: paginatedData,
                    pagination: {
                        total_items: totalItems,
                        page,
                        limit,
                        total_pages: totalPages,
                    },
                };
            }
            if (data &&
                typeof data === 'object' &&
                'message' in data &&
                'data' in data) {
                return {
                    statusCode: 200,
                    status: 'success',
                    message: typeof data.message === 'object'
                        ? data.message[lang] || messages[lang]
                        : data.message,
                    data: data.data ?? undefined,
                };
            }
            return {
                statusCode: 200,
                status: 'success',
                message: messages[lang],
                data: data ?? undefined,
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map