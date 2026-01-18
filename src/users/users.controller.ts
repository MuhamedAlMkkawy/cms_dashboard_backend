import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/auth/dtos/CreateUserDto.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET ALL USERS
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // GET SINGLE USER
  @Get('/single')
  async getSingleUser(@Body('email') email: string) {
    if(!email){
      throw new NotFoundException('You Should Include the email of the user You Looking for...!!')
    }
    return await this.usersService.getSingleUser(email);
  }

  
  // CREATE NEW USER
  // @Post()
  // async createNewUser(@Body() body : any){
  //   const validatedData = plainToClass(CreateUserDto , body)

  //   return await this.usersService.createNewUser(validatedData)
  // }
  // UPDATE USER
  // DELETE USER
}
