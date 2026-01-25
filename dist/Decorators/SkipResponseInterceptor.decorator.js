"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const SkipResponseInterceptor = () => (0, common_1.SetMetadata)('skipResponseInterceptor', true);
exports.SkipResponseInterceptor = SkipResponseInterceptor;
//# sourceMappingURL=SkipResponseInterceptor.decorator.js.map