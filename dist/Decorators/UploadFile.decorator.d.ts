interface UploadOptions {
    type?: 'single' | 'multiple';
    fieldName?: string;
    folder?: string;
    maxFiles?: number;
    maxFileSize?: number;
    allowedMimeTypes?: RegExp;
}
export declare function UploadFile(options: UploadOptions): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
