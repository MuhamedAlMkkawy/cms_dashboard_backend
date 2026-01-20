import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { LoginDto } from './dtos/LoginDto.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { I18nService } from 'nestjs-i18n';

@Controller('/')
export class AuthController {
  constructor(
    private authService: AuthService,
    private i18n: I18nService,
  ) {}

  // ===================== SIGNUP =====================
  @Post('signup')
  @UseInterceptors(AnyFilesInterceptor())
  async signup(@Body() body: CreateUserDto, @Req() req: any) {
    return this.authService.signup(body, req);
  }

  // ===================== LOGIN =====================
  @Post('login')
  @UseInterceptors(FlatToNestedWithFilesInterceptor)
  async login(@Body() body: LoginDto, @Req() req: any) {
    return this.authService.login(body, req);
  }

  // ===================== LOGOUT =====================
  @Post('logout')
  async logout() {
    return {
      message: this.i18n.t('common.authService.LOGOUT_SUCCESS'),
      data: null,
    };
  }
}
