import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Delete,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { LoginDto } from './dtos/LoginDto.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ===================== SIGNUP =====================
  @Post('signup')
  @UseInterceptors(AnyFilesInterceptor())
  async signup(@Body() body: CreateUserDto, @Req() req: any) {
    if (req.user) {
      throw new BadRequestException('You are already logged in');
    }

    return this.authService.signup(body);
  }

  // ===================== LOGIN =====================
  @Post('login')
  @UseInterceptors(FlatToNestedWithFilesInterceptor)
  async login(@Body() body: LoginDto, @Req() req: any) {
    if (req.user) {
      throw new BadRequestException('You are already logged in');
    }

    return this.authService.login(body);
  }

  // ===================== LOGOUT =====================
  @Delete('logout')
  async logout() {
    // JWT logout is CLIENT-SIDE
    return {
      message: 'Logged out successfully',
      data : null
    };
  }
}
