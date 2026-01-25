import { ConfigService } from '@nestjs/config';
export declare class UploadsController {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadSingle(file: Express.Multer.File): {
        path: string;
        originalName: string;
    };
    uploadMultiple(files: Express.Multer.File[]): {
        path: string;
        originalName: string;
    }[];
}
