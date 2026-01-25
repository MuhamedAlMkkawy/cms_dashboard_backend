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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const FlatToNestedWithFilesInterceptor_interceptor_1 = require("../interceptors/FlatToNestedWithFilesInterceptor.interceptor");
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const CreateProject_dto_1 = require("./dtos/CreateProject.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const class_transformer_1 = require("class-transformer");
const CreatePage_dto_1 = require("../pages/dtos/CreatePage.dto");
const CardSliderDto_dto_1 = require("../components/dtos/fields/CardSliderDto.dto");
const MenuDto_dto_1 = require("../components/dtos/fields/MenuDto.dto");
const CustomHtml_dto_1 = require("../components/dtos/fields/CustomHtml.dto");
const LogoDto_dto_1 = require("../components/dtos/fields/LogoDto.dto");
const Buttons_dto_1 = require("../components/dtos/fields/Buttons.dto");
const Accordion_dto_1 = require("../components/dtos/fields/Accordion.dto");
const Timeline_dto_1 = require("../components/dtos/fields/Timeline.dto");
const SocialFields_dto_1 = require("../components/dtos/fields/SocialFields.dto");
const TabsDto_dto_1 = require("../components/dtos/fields/TabsDto.dto");
const nestjs_i18n_1 = require("nestjs-i18n");
const componentDtoMap = {
    'card-slider': CardSliderDto_dto_1.CardSliderDto,
    'nav-menu': MenuDto_dto_1.MenuContentDto,
    'custom-html': CustomHtml_dto_1.CustomHtmlDto,
    logo: LogoDto_dto_1.LogoFieldsDto,
    buttons: Buttons_dto_1.ButtonsFieldsDto,
    accordion: Accordion_dto_1.AccordionFieldsDto,
    timeline: Timeline_dto_1.TimelineFieldsDto,
    'social-media': SocialFields_dto_1.SocialMediaFieldsDto,
    tabs: TabsDto_dto_1.TabsFieldsDto,
};
let ProjectsController = class ProjectsController {
    projectsService;
    i18n;
    constructor(projectsService, i18n) {
        this.projectsService = projectsService;
        this.i18n = i18n;
    }
    async getAllProjects(language) {
        if (!language) {
            throw new common_1.BadRequestException(await this.i18n.translate('projects.controller.LANGUAGE_REQUIRED_GET'));
        }
        return this.projectsService.getAllProjects(language);
    }
    async getProject(id, language) {
        if (!language) {
            throw new common_1.BadRequestException(await this.i18n.translate('projects.controller.LANGUAGE_REQUIRED'));
        }
        return this.projectsService.getProject(id, language);
    }
    async createProject(body) {
        const project = {
            ...body,
            visible: true,
            languages: ['ar', 'en'],
        };
        return this.projectsService.createProject(project);
    }
    async updateProject(id, body, language) {
        if (!language) {
            throw new common_1.BadRequestException(await this.i18n.translate('projects.controller.LANGUAGE_REQUIRED'));
        }
        return this.projectsService.updateProject(id, body, language);
    }
    async addPagesToProject(id, body, language) {
        if (!body) {
            throw new common_1.NotFoundException(await this.i18n.translate('projects.controller.NO_DATA_TO_ADD'));
        }
        if (!language) {
            throw new common_1.BadRequestException(await this.i18n.translate('projects.controller.LANGUAGE_REQUIRED_ADD'));
        }
        const validatedBody = (0, class_transformer_1.plainToClass)(CreatePage_dto_1.CreatePageDto, {
            projectID: id,
            ...body,
        });
        for (const section of validatedBody.sections || []) {
            if (!section.components || !Array.isArray(section.components))
                continue;
            for (const component of section.components) {
                const ComponentDto = componentDtoMap[component.type];
                if (!ComponentDto) {
                    throw new common_1.NotFoundException(await this.i18n.translate('projects.controller.UNKNOWN_COMPONENT_TYPE', {
                        args: { type: component.type },
                    }));
                }
                const validatedComponent = (0, class_transformer_1.plainToClass)(ComponentDto, component.content);
                Object.assign(component, validatedComponent);
            }
        }
        return this.projectsService.addPagesToProject(id, validatedBody, language);
    }
    async updatePageNested(projectId, pageId, body, language) {
        if (!language) {
            throw new common_1.BadRequestException(await this.i18n.translate('projects.controller.LANGUAGE_REQUIRED'));
        }
        if (!body) {
            throw new common_1.BadRequestException(await this.i18n.translate('projects.controller.NO_DATA_PROVIDED'));
        }
        return this.projectsService.updatePageNested(projectId, pageId, language, body);
    }
    async deleteProject(id) {
        return this.projectsService.deleteProject(id);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProject", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProject_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Post)('/:id/pages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "addPagesToProject", null);
__decorate([
    (0, common_1.Patch)('/:projectId/pages/:pageId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('pageId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)('accept-language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updatePageNested", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: `./uploads`,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file) {
                return new Error("Logo isn't Uploaded");
            }
            else if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|svg\+xml)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    }), FlatToNestedWithFilesInterceptor_interceptor_1.FlatToNestedWithFilesInterceptor),
    __metadata("design:paramtypes", [typeof (_a = typeof projects_service_1.ProjectsService !== "undefined" && projects_service_1.ProjectsService) === "function" ? _a : Object, nestjs_i18n_1.I18nService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map