import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
    private readonly i18n: I18nService,
  ) {}

  // GET ALL USERS
  async getAllUsers() {
    const users = await this.usersRepo.find();

    if (!users || users.length === 0) {
      throw new NotFoundException(
        await this.i18n.translate('users.service.NO_USERS_FOUND'),
      );
    }

    return users;
  }

  // GET SINGLE USER
  async getSingleUser(email: string) {
    const existingUser = await this.usersRepo.findOneBy({ email });

    if (!existingUser) {
      throw new NotFoundException(
        await this.i18n.translate('users.service.NO_ACCOUNT_FOUND'),
      );
    }

    return existingUser;
  }
}
