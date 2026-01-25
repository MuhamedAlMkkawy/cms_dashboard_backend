"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = UploadFile;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const common_2 = require("@nestjs/common");
function UploadFile(options) {
    const folder = options.folder || 'uploads';
    const fieldName = options.fieldName || (options.type === 'multiple' ? 'files' : 'file');
    const maxFiles = options.maxFiles || 10;
    const maxFileSize = options.maxFileSize || 50 * 1024 * 1024;
    const allowedMimeTypes = options.allowedMimeTypes || /\/(jpg|jpeg|png|gif|mp4|mov|avi|svg\+xml)$/;
    const storage = (0, multer_1.diskStorage)({
        destination: (req, file, cb) => cb(null, `./${folder}`),
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (!file.mimetype.match(allowedMimeTypes)) {
            return cb(new common_2.BadRequestException('Only image/video files are allowed!'), false);
        }
        cb(null, true);
    };
    const interceptor = options.type === 'multiple'
        ? (0, platform_express_1.FilesInterceptor)(fieldName, maxFiles, {
            storage,
            limits: { fileSize: maxFileSize },
            fileFilter,
        })
        : (0, platform_express_1.FileInterceptor)(fieldName, {
            storage,
            limits: { fileSize: maxFileSize },
            fileFilter,
        });
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)(interceptor));
}
//# sourceMappingURL=UploadFile.decorator.js.map