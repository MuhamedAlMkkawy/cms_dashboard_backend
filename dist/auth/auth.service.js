"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entities_1 = require("../users/entities/users.entities");
const typeorm_2 = require("typeorm");
const crypto_1 = require("crypto");
const util_1 = require("util");
const crypto = __importStar(require("crypto"));
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const nestjs_i18n_1 = require("nestjs-i18n");
const scrypt = (0, util_1.promisify)(crypto.scrypt);
let AuthService = class AuthService {
    usersRepo;
    usersService;
    jwtService;
    i18n;
    constructor(usersRepo, usersService, jwtService, i18n) {
        this.usersRepo = usersRepo;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.i18n = i18n;
    }
    async signup(body, req) {
        if (req.user) {
            throw new common_1.BadRequestException(await this.i18n.translate('auth.authService.ALREADY_LOGGED_IN'));
        }
        const users = await this.usersRepo.find();
        const existingUser = users.find((user) => user.email == body.email);
        if (existingUser) {
            throw new common_1.BadRequestException(await this.i18n.translate('auth.authService.USER_ALREADY_EXISTS'));
        }
        const userEmail = body.email;
        const salt = (0, crypto_1.randomBytes)(32).toString('hex');
        const hash = (await scrypt(body.password, salt, 32));
        const hashedPassword = salt + '.' + hash.toString('hex');
        const generetedToken = this.jwtService.sign({ userEmail });
        const userData = {
            ...body,
            token: generetedToken,
            password: hashedPassword,
        };
        const savedUser = this.usersRepo.create(userData);
        const result = await this.usersRepo.save(savedUser);
        return {
            message: await this.i18n.translate('auth.authService.SIGNUP_SUCCESS'),
            data: result,
        };
    }
    async login(body, req) {
        if (req.user) {
            throw new common_1.BadRequestException(await this.i18n.translate('auth.authService.ALREADY_LOGGED_IN'));
        }
        const user = await this.usersService.getSingleUser(body.email);
        const [salt, hashedPassword] = user.password.split('.');
        const hash = (await scrypt(body.password, salt, 32));
        if (hash.toString('hex') !== hashedPassword) {
            throw new common_1.BadRequestException(await this.i18n.translate('auth.authService.INVALID_CREDENTIALS'));
        }
        const newToken = this.jwtService.sign({ email: user.email });
        user.token = newToken;
        await this.usersRepo.save(user);
        return {
            message: await this.i18n.translate('auth.authService.LOGIN_SUCCESS'),
            data: user,
        };
    }
    async logout(req) {
        if (!req.user) {
            throw new common_1.BadRequestException(await this.i18n.translate('auth.authService.NOT_LOGGED_IN'));
        }
        const user = await this.usersService.getSingleUser(req.user.email);
        await this.usersRepo.save(user);
        return {
            message: await this.i18n.translate('auth.authService.LOGOUT_SUCCESS'),
            data: null,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entities_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        jwt_1.JwtService,
        nestjs_i18n_1.I18nService])
], AuthService);
//# sourceMappingURL=auth.service.js.map