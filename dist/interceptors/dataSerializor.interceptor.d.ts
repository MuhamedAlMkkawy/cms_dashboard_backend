import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
export declare function Serialize(dto: any): MethodDecorator & ClassDecorator;
export declare class UniversalSerializer implements NestInterceptor {
    private dto;
    constructor(dto: any);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>;
    private transformItem;
    private autoTransformData;
    private transformFormData;
    private ensureProperTypes;
    private guessAndTransformType;
}
