import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LoginDto } from './dtos/LoginDto.dto';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FlatToNestedWithFilesInterceptor)
  async signup(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }

  @Post('login')
  @UseInterceptors(FlatToNestedWithFilesInterceptor)
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
