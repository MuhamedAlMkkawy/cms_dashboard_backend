"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LanguageInterceptor = class LanguageInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const rawLang = request.query.lang || request.headers['accept-language'] || '';
        const selectedLang = rawLang
            .toString()
            .toLowerCase()
            .split(',')[0]
            .split('-')[0];
        const localize = (obj) => {
            if (Array.isArray(obj))
                return obj.map(localize);
            if (!obj ||
                typeof obj !== 'object' ||
                obj instanceof Date ||
                obj.constructor?.name === 'ObjectId') {
                return obj;
            }
            const result = {};
            for (const [key, value] of Object.entries(obj)) {
                if (key === '_id') {
                    result[key] = value;
                    continue;
                }
                if (value &&
                    typeof value === 'object' &&
                    Object.keys(value).every((k) => typeof value[k] === 'string')) {
                    if (selectedLang && value[selectedLang]) {
                        result[key] = value[selectedLang];
                    }
                    else {
                        result[key] = value;
                    }
                }
                else {
                    result[key] = localize(value);
                }
            }
            return result;
        };
        return next.handle().pipe((0, operators_1.map)((response) => {
            if (!response)
                return response;
            if (response.message && typeof response.message === 'string') {
                return response;
            }
            if (response.status && response.message) {
                return response;
            }
            if (response.data) {
                if (Array.isArray(response.data)) {
                    response.data = response.data.map(localize);
                }
                else {
                    response.data = localize(response.data);
                }
            }
            else {
                response = localize(response);
            }
            return response;
        }));
    }
};
exports.LanguageInterceptor = LanguageInterceptor;
exports.LanguageInterceptor = LanguageInterceptor = __decorate([
    (0, common_1.Injectable)()
], LanguageInterceptor);
//# sourceMappingURL=languageHandle.interceptor.js.map