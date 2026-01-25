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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResponseDto = exports.PageResponseDto = exports.SectionResponseDto = void 0;
const ComponentResponce_dto_1 = require("../../components/dtos/ComponentResponce.dto");
const class_transformer_1 = require("class-transformer");
class SectionResponseDto {
    id;
    name;
    visible;
    components;
}
exports.SectionResponseDto = SectionResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], SectionResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SectionResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], SectionResponseDto.prototype, "visible", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ComponentResponce_dto_1.ComponentResponce),
    __metadata("design:type", Array)
], SectionResponseDto.prototype, "components", void 0);
class PageResponseDto {
    _id;
    name;
    visible;
    projectID;
    language;
    sections;
}
exports.PageResponseDto = PageResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PageResponseDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PageResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], PageResponseDto.prototype, "visible", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PageResponseDto.prototype, "projectID", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PageResponseDto.prototype, "language", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => SectionResponseDto),
    __metadata("design:type", Array)
], PageResponseDto.prototype, "sections", void 0);
class ProjectResponseDto {
    _id;
    logo;
    name;
    description;
    visible;
    languages;
    pages;
}
exports.ProjectResponseDto = ProjectResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "logo", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProjectResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], ProjectResponseDto.prototype, "visible", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ProjectResponseDto.prototype, "languages", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => PageResponseDto),
    __metadata("design:type", Array)
], ProjectResponseDto.prototype, "pages", void 0);
//# sourceMappingURL=ProjectResponce.dto.js.map