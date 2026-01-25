import { Users } from 'src/users/entities/users.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/LoginDto.dto';
import { UsersService } from 'src/users/users.service';
import { I18nService } from 'nestjs-i18n';
export declare class AuthService {
    private usersRepo;
    private usersService;
    private jwtService;
    private i18n;
    constructor(usersRepo: Repository<Users>, usersService: UsersService, jwtService: JwtService, i18n: I18nService);
    signup(body: CreateUserDto, req: any): Promise<{
        message: string;
        data: Users;
    }>;
    login(body: LoginDto, req: any): Promise<{
        message: string;
        data: Users;
    }>;
    logout(req: any): Promise<{
        message: string;
        data: null;
    }>;
}
