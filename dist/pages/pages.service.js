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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pages_entities_1 = require("./entities/pages.entities");
const typeorm_2 = require("typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
let PagesService = class PagesService {
    repo;
    i18n;
    constructor(repo, i18n) {
        this.repo = repo;
        this.i18n = i18n;
    }
    async getAllPages() {
        const pages = await this.repo.find();
        if (!pages.length) {
            throw new common_1.NotFoundException(await this.i18n.translate('pages.pagesService.NO_PAGES_FOUND'));
        }
        return pages;
    }
    async getAllProjectPages(id, language) {
        const whereCondition = {
            projectID: id,
        };
        if (language) {
            whereCondition.language = language;
        }
        const pages = await this.repo.find({
            where: whereCondition,
        });
        if (!pages.length) {
            throw new common_1.NotFoundException(await this.i18n.translate('pages.pagesService.NO_PAGES_FOUND'));
        }
        return pages;
    }
    async getSinglePage(id) {
        const pages = await this.getAllPages();
        const page = pages.find((page) => page._id.toString() === id);
        if (!page) {
            throw new common_1.NotFoundException(await this.i18n.translate('pages.pagesService.PAGE_NOT_FOUND'));
        }
        return page;
    }
    async deletePage(id) {
        const page = await this.getSinglePage(id);
        if (!page) {
            throw new common_1.NotFoundException(await this.i18n.translate('pages.pagesService.PAGE_NOT_FOUND'));
        }
        await this.repo.remove(page);
        return {
            message: await this.i18n.translate('pages.pagesService.PAGE_DELETED_SUCCESS'),
            data: null,
        };
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pages_entities_1.Pages)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], PagesService);
//# sourceMappingURL=pages.service.js.map