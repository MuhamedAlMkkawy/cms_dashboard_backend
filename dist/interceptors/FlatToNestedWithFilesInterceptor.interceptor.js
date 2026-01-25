"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatToNestedWithFilesInterceptor = void 0;
const common_1 = require("@nestjs/common");
let FlatToNestedWithFilesInterceptor = class FlatToNestedWithFilesInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { body, files } = request;
        if (body && typeof body === 'object') {
            request.body = this.flattenToNested(body);
            if (files?.length) {
                request.body = this.mergeFilesIntoBody(request.body, files);
            }
        }
        return next.handle();
    }
    flattenToNested(flat) {
        const nested = {};
        for (const flatKey in flat) {
            if (!Object.prototype.hasOwnProperty.call(flat, flatKey))
                continue;
            const pathParts = flatKey.split('.');
            let current = nested;
            for (let i = 0; i < pathParts.length; i++) {
                const part = pathParts[i];
                const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
                if (arrayMatch) {
                    const [, arrName, indexStr] = arrayMatch;
                    const index = parseInt(indexStr, 10);
                    if (!current[arrName])
                        current[arrName] = [];
                    if (!current[arrName][index])
                        current[arrName][index] = {};
                    current = current[arrName][index];
                }
                else {
                    if (i === pathParts.length - 1) {
                        current[part] = flat[flatKey];
                    }
                    else {
                        if (!current[part])
                            current[part] = {};
                        current = current[part];
                    }
                }
            }
        }
        return nested;
    }
    mergeFilesIntoBody(body, files) {
        files.forEach((file) => {
            const fieldPath = file.fieldname;
            const value = `/uploads/${file.filename}`;
            const pathParts = fieldPath
                .replace(/\[(\d+)\]/g, '.$1')
                .split('.')
                .filter(Boolean);
            let current = body;
            for (let i = 0; i < pathParts.length - 1; i++) {
                const key = pathParts[i];
                if (/^\d+$/.test(pathParts[i + 1])) {
                    if (!Array.isArray(current[key]))
                        current[key] = [];
                    if (!current[key][+pathParts[i + 1]])
                        current[key][+pathParts[i + 1]] = {};
                }
                else {
                    if (!current[key])
                        current[key] = {};
                }
                current = current[key];
            }
            const lastKey = pathParts[pathParts.length - 1];
            current[lastKey] = value;
        });
        return body;
    }
};
exports.FlatToNestedWithFilesInterceptor = FlatToNestedWithFilesInterceptor;
exports.FlatToNestedWithFilesInterceptor = FlatToNestedWithFilesInterceptor = __decorate([
    (0, common_1.Injectable)()
], FlatToNestedWithFilesInterceptor);
//# sourceMappingURL=FlatToNestedWithFilesInterceptor.interceptor.js.map