"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalSerializer = void 0;
exports.Serialize = Serialize;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const operators_1 = require("rxjs/operators");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new UniversalSerializer(dto));
}
class UniversalSerializer {
    dto;
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (request.body) {
            request.body = this.autoTransformData(request.body, request.headers['content-type']);
        }
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (Array.isArray(data)) {
                return data.map(item => this.transformItem(item));
            }
            else if (data?.data && Array.isArray(data.data)) {
                return {
                    ...data,
                    data: data.data.map(item => this.transformItem(item))
                };
            }
            else if (data?.items && Array.isArray(data.items)) {
                return {
                    ...data,
                    items: data.items.map(item => this.transformItem(item))
                };
            }
            else {
                return this.transformItem(data);
            }
        }));
    }
    transformItem(item) {
        if (!item || typeof item !== 'object')
            return item;
        return (0, class_transformer_1.plainToClass)(this.dto, item, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true
        });
    }
    autoTransformData(body, contentType) {
        if (!body || typeof body !== 'object')
            return body;
        if (contentType?.includes('multipart/form-data')) {
            return this.transformFormData(body);
        }
        return this.ensureProperTypes(body);
    }
    transformFormData(body) {
        const transformed = { ...body };
        for (const key in transformed) {
            if (transformed.hasOwnProperty(key)) {
                transformed[key] = this.guessAndTransformType(transformed[key]);
            }
        }
        return transformed;
    }
    ensureProperTypes(body) {
        const transformed = { ...body };
        for (const key in transformed) {
            if (transformed.hasOwnProperty(key)) {
                if (typeof transformed[key] === 'string') {
                    transformed[key] = this.guessAndTransformType(transformed[key]);
                }
            }
        }
        return transformed;
    }
    guessAndTransformType(value) {
        if (value === null || value === undefined)
            return value;
        if (typeof value === 'string' && value.trim().startsWith('[') && value.trim().endsWith(']')) {
            try {
                return JSON.parse(value);
            }
            catch {
                return value.split(',').map(v => this.guessAndTransformType(v.trim()));
            }
        }
        if (typeof value === 'string' && value.trim().startsWith('{') && value.trim().endsWith('}')) {
            try {
                return JSON.parse(value);
            }
            catch {
                return value;
            }
        }
        if (!isNaN(Number(value)) && value !== '') {
            return Number(value);
        }
        if (value === 'true' || value === 'false') {
            return value === 'true';
        }
        if (value === 'null') {
            return null;
        }
        if (value === 'undefined') {
            return undefined;
        }
        return value;
    }
}
exports.UniversalSerializer = UniversalSerializer;
//# sourceMappingURL=dataSerializor.interceptor.js.map