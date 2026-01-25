"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const CreateUserDto_dto_1 = require("./dtos/CreateUserDto.dto");
const LoginDto_dto_1 = require("./dtos/LoginDto.dto");
const platform_express_1 = require("@nestjs/platform-express");
const FlatToNestedWithFilesInterceptor_interceptor_1 = require("../interceptors/FlatToNestedWithFilesInterceptor.interceptor");
const nestjs_i18n_1 = require("nestjs-i18n");
let AuthController = class AuthController {
    authService;
    i18n;
    constructor(authService, i18n) {
        this.authService = authService;
        this.i18n = i18n;
    }
    async signup(body, req) {
        return this.authService.signup(body, req);
    }
    async login(body, req) {
        return this.authService.login(body, req);
    }
    async logout() {
        return {
            message: await this.i18n.translate('auth.authService.LOGOUT_SUCCESS'),
            data: null,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseInterceptors)(FlatToNestedWithFilesInterceptor_interceptor_1.FlatToNestedWithFilesInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        nestjs_i18n_1.I18nService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map