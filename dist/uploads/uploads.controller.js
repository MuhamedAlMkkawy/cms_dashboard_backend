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
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const UploadFile_decorator_1 = require("../Decorators/UploadFile.decorator");
let UploadsController = class UploadsController {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    uploadSingle(file) {
        if (!file)
            throw new common_1.BadRequestException('No file uploaded');
        const baseUrl = this.configService.get('BASE_URL');
        return {
            path: `${baseUrl}${file.path.replace(/\\/g, '/')}`,
            originalName: file.originalname,
        };
    }
    uploadMultiple(files) {
        if (!files || !files.length)
            throw new common_1.BadRequestException('No files uploaded');
        const baseUrl = this.configService.get('BASE_URL');
        return files.map((file) => ({
            path: `${baseUrl}${file.path.replace(/\\/g, '/')}`,
            originalName: file.originalname,
        }));
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('single'),
    (0, UploadFile_decorator_1.UploadFile)({ type: 'single', fieldName: 'file' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, UploadFile_decorator_1.UploadFile)({
        type: 'multiple',
        fieldName: 'files',
        maxFiles: 10,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "uploadMultiple", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map