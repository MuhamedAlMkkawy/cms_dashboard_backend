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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const components_entities_1 = require("../components/entities/components.entities");
const pages_entities_1 = require("../pages/entities/pages.entities");
const projects_entities_1 = require("../projects/entities/projects.entities");
const typeorm_2 = require("typeorm");
let StatisticsService = class StatisticsService {
    projectsRepo;
    pagesRepo;
    componentsRepo;
    constructor(projectsRepo, pagesRepo, componentsRepo) {
        this.projectsRepo = projectsRepo;
        this.pagesRepo = pagesRepo;
        this.componentsRepo = componentsRepo;
    }
    async getAllStatistics() {
        const projects = (await this.projectsRepo.find()).length;
        const pages = (await this.pagesRepo.find()).length;
        const sections = (await this.pagesRepo.find()).reduce((acc, page) => acc + (page.sections?.length || 0), 0);
        const components = (await this.componentsRepo.find()).length;
        const data = {
            projects: projects,
            pages: pages,
            sections: sections,
            components: components,
        };
        return data;
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(projects_entities_1.Projects)),
    __param(1, (0, typeorm_1.InjectRepository)(pages_entities_1.Pages)),
    __param(2, (0, typeorm_1.InjectRepository)(components_entities_1.Components)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map