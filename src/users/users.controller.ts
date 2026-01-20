import { Body, Controller, Get, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { I18nService } from 'nestjs-i18n';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  // GET ALL USERS
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // GET SINGLE USER
  @Get('/single')
  async getSingleUser(@Body('email') email: string) {
    if (!email) {
      throw new NotFoundException(
        await this.i18n.translate('users.controller.EMAIL_REQUIRED'),
      );
    }
    return await this.usersService.getSingleUser(email);
  }
}
