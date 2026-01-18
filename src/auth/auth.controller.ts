import { Controller, Post, Body, UseInterceptors, Session, BadRequestException, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LoginDto } from './dtos/LoginDto.dto';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(AnyFilesInterceptor())
  async signup(@Body() body: CreateUserDto , @Session() session : any) {
    if (session.user_token) {
      throw new BadRequestException('You are already logged in');
    }
    return await this.authService.signup(body);
  }

  @Post('login')
  @UseInterceptors(FlatToNestedWithFilesInterceptor)
  async login(@Body() body: LoginDto, @Session() session: any) {
    if (session.user_token) {
      throw new BadRequestException('You are already logged in');
    }

    const user = await this.authService.login(body);

    session.user_token = user.token;
    session.role = user.role;

    return user;
  }

  // [ 3 ] Logout
  @Delete('logout')
  async logout(@Session() session: any) {
    if (!session.user_token) {
      throw new BadRequestException('You are Already Logged Out')
    }
    
    session.user_token = null;
    return {
      message: 'You have logged out successfully!',
      data: null,
    };
  }
}
