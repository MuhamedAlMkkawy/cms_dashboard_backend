import { Users } from './entities/users.entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
export declare class UsersService {
    private usersRepo;
    private readonly i18n;
    constructor(usersRepo: Repository<Users>, i18n: I18nService);
    getAllUsers(): Promise<Users[]>;
    getSingleUser(email: string): Promise<Users>;
}
