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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const lodash_1 = require("lodash");
const projects_entities_1 = require("./entities/projects.entities");
const pages_entities_1 = require("../pages/entities/pages.entities");
const components_entities_1 = require("../components/entities/components.entities");
const uuid_1 = require("uuid");
const nestjs_i18n_1 = require("nestjs-i18n");
let ProjectsService = class ProjectsService {
    projectsRepo;
    pageRepo;
    componentsRepo;
    i18n;
    constructor(projectsRepo, pageRepo, componentsRepo, i18n) {
        this.projectsRepo = projectsRepo;
        this.pageRepo = pageRepo;
        this.componentsRepo = componentsRepo;
        this.i18n = i18n;
    }
    async getAllProjects(language) {
        const projects = await this.projectsRepo.find();
        const projectsWithPages = await Promise.all(projects.map(async (project) => {
            const pages = await this.pageRepo.find({
                where: {
                    projectID: new mongodb_1.ObjectId(project._id).toString(),
                    language,
                },
            });
            return {
                ...project,
                pages,
            };
        }));
        return projectsWithPages;
    }
    async getProject(id, language) {
        const project = await this.projectsRepo.findOneBy({
            _id: new mongodb_1.ObjectId(id),
        });
        if (!project) {
            throw new common_1.NotFoundException(await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'));
        }
        const pages = await this.pageRepo.find({
            where: {
                projectID: new mongodb_1.ObjectId(project._id).toString(),
                language,
            },
        });
        return {
            ...project,
            pages,
        };
    }
    async createProject(data) {
        const newProject = this.projectsRepo.create(data);
        return await this.projectsRepo.save(newProject);
    }
    async updateProject(id, project, language) {
        const existing = await this.getProject(id, language);
        const updatedProject = (0, lodash_1.merge)(existing, project);
        return await this.projectsRepo.save(updatedProject);
    }
    async addPagesToProject(projectId, pageData, language) {
        const project = await this.projectsRepo.findOneBy({
            _id: new mongodb_1.ObjectId(projectId),
        });
        if (!project)
            throw new common_1.NotFoundException(await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'));
        const newPage = new pages_entities_1.Pages();
        newPage.projectID = projectId;
        newPage.name =
            pageData.name ||
                (await this.i18n.translate('projects.service.UNTITLED_PAGE'));
        newPage.visible = pageData.visible ?? true;
        newPage.language = language;
        newPage.sections = [];
        for (const [secIndex, secData] of (pageData.sections || []).entries()) {
            const section = {
                id: Math.ceil(Math.random() * 1e7),
                name: secData.name ||
                    (await this.i18n.translate('projects.service.UNTITLED_SECTION')),
                visible: secData.visible ?? true,
                components: [],
            };
            for (const [compIndex, compData] of (secData.components || []).entries()) {
                const targetComponent = await this.componentsRepo.findOneBy({
                    type: compData.type,
                });
                if (!targetComponent)
                    throw new common_1.NotFoundException(await this.i18n.t('projects.service.COMPONENT_TYPE_NOT_FOUND', {
                        args: { type: compData.type },
                    }));
                const pageComponent = {
                    id: (0, uuid_1.v4)(),
                    componentId: targetComponent._id,
                    type: targetComponent.type,
                    visible: compData.visible ?? true,
                    order: compIndex,
                    content: compData.content || {},
                };
                section.components.push(pageComponent);
            }
            newPage.sections.push(section);
        }
        const savedPage = await this.pageRepo.save(newPage);
        project.pages = project.pages ? [...project.pages, savedPage] : [savedPage];
        await this.projectsRepo.save(project);
        return savedPage;
    }
    async updatePageNested(projectId, pageId, language, pageData) {
        const project = await this.projectsRepo.findOneBy({
            _id: new mongodb_1.ObjectId(projectId),
        });
        if (!project)
            throw new common_1.NotFoundException(await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'));
        const pageIndex = project.pages?.findIndex((p) => p._id.toString() === pageId);
        if (pageIndex === undefined || pageIndex === -1)
            throw new common_1.NotFoundException(await this.i18n.translate('projects.service.PAGE_NOT_FOUND'));
        const existingPage = project.pages[pageIndex];
        existingPage.name =
            pageData.name ||
                existingPage.name ||
                (await this.i18n.translate('projects.service.UNTITLED_PAGE'));
        existingPage.visible = pageData.visible ?? existingPage.visible;
        existingPage.language = language || existingPage.language;
        existingPage.sections = [];
        for (const [secIndex, secData] of (pageData.sections || []).entries()) {
            const section = {
                id: Math.ceil(Math.random() * 1e7),
                name: secData.name ||
                    (await this.i18n.translate('projects.service.UNTITLED_SECTION')),
                visible: secData.visible ?? true,
                components: [],
            };
            for (const [compIndex, compData] of (secData.components || []).entries()) {
                const targetComponent = await this.componentsRepo.findOneBy({
                    type: compData.type,
                });
                if (!targetComponent)
                    throw new common_1.NotFoundException(await this.i18n.t('projects.service.COMPONENT_TYPE_NOT_FOUND', {
                        args: { type: compData.type },
                    }));
                const pageComponent = {
                    id: (0, uuid_1.v4)(),
                    componentId: targetComponent._id,
                    type: targetComponent.type,
                    visible: compData.visible ?? true,
                    order: compIndex,
                    content: compData.content || {},
                };
                section.components.push(pageComponent);
            }
            existingPage.sections.push(section);
        }
        const savedPage = await this.pageRepo.save(existingPage);
        project.pages[pageIndex] = savedPage;
        await this.projectsRepo.save(project);
        return savedPage;
    }
    async deleteProject(id) {
        const project = await this.projectsRepo.findOneBy({
            _id: new mongodb_1.ObjectId(id),
        });
        if (!project) {
            throw new common_1.NotFoundException(await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'));
        }
        await this.projectsRepo.remove(project);
        return {
            message: await this.i18n.translate('projects.service.PROJECT_DELETED_SUCCESS'),
            data: null,
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(projects_entities_1.Projects)),
    __param(1, (0, typeorm_1.InjectRepository)(pages_entities_1.Pages)),
    __param(2, (0, typeorm_1.InjectRepository)(components_entities_1.Components)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map