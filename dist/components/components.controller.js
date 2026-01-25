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
exports.ComponentsController = void 0;
const components_service_1 = require("./components.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const FlatToNestedWithFilesInterceptor_interceptor_1 = require("../interceptors/FlatToNestedWithFilesInterceptor.interceptor");
const CreateComponent_dto_1 = require("./dtos/CreateComponent.dto");
const class_transformer_1 = require("class-transformer");
let ComponentsController = class ComponentsController {
    ComponentsService;
    constructor(ComponentsService) {
        this.ComponentsService = ComponentsService;
    }
    async getAllComponents() {
        const components = await this.ComponentsService.getAllComponents();
        return components;
    }
    async getSingleComponent(id) {
        return await this.ComponentsService.getSingleComponent(id);
    }
    async createNewComponent(body) {
        const validatedComponent = (0, class_transformer_1.plainToClass)(CreateComponent_dto_1.CreateComponentDto, body);
        return await this.ComponentsService.createComponent(validatedComponent);
    }
    async updateComponent(id, body) {
        const updatedComponent = await this.ComponentsService.updateComponent(id, body);
        return updatedComponent;
    }
    async deleteComponent(id) {
        return await this.ComponentsService.deleteComponent(id);
    }
};
exports.ComponentsController = ComponentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "getAllComponents", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "getSingleComponent", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "createNewComponent", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "updateComponent", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComponentsController.prototype, "deleteComponent", null);
exports.ComponentsController = ComponentsController = __decorate([
    (0, common_1.Controller)('components'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)(), FlatToNestedWithFilesInterceptor_interceptor_1.FlatToNestedWithFilesInterceptor),
    __metadata("design:paramtypes", [components_service_1.ComponentsService])
], ComponentsController);
//# sourceMappingURL=components.controller.js.map