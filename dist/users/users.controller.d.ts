import { UsersService } from './users.service';
import { I18nService } from 'nestjs-i18n';
export declare class UsersController {
    private usersService;
    private readonly i18n;
    constructor(usersService: UsersService, i18n: I18nService);
    getAllUsers(): Promise<import("./entities/users.entities").Users[]>;
    getSingleUser(email: string): Promise<import("./entities/users.entities").Users>;
}
