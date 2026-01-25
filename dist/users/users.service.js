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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entities_1 = require("./entities/users.entities");
const typeorm_2 = require("typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
let UsersService = class UsersService {
    usersRepo;
    i18n;
    constructor(usersRepo, i18n) {
        this.usersRepo = usersRepo;
        this.i18n = i18n;
    }
    async getAllUsers() {
        const users = await this.usersRepo.find();
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException(await this.i18n.translate('users.service.NO_USERS_FOUND'));
        }
        return users;
    }
    async getSingleUser(email) {
        const existingUser = await this.usersRepo.findOneBy({ email });
        if (!existingUser) {
            throw new common_1.NotFoundException(await this.i18n.translate('users.service.NO_ACCOUNT_FOUND'));
        }
        return existingUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entities_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], UsersService);
//# sourceMappingURL=users.service.js.map