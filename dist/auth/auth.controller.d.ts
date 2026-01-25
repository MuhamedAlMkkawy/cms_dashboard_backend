import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { LoginDto } from './dtos/LoginDto.dto';
import { I18nService } from 'nestjs-i18n';
export declare class AuthController {
    private authService;
    private i18n;
    constructor(authService: AuthService, i18n: I18nService);
    signup(body: CreateUserDto, req: any): Promise<{
        message: string;
        data: import("../users/entities/users.entities").Users;
    }>;
    login(body: LoginDto, req: any): Promise<{
        message: string;
        data: import("../users/entities/users.entities").Users;
    }>;
    logout(): Promise<{
        message: string;
        data: null;
    }>;
}
