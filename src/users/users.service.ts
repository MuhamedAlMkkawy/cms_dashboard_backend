import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
  ) {}

  // GET ALL USERS
  async getAllUsers () {
    const users = await this.usersRepo.find()

    if(!users){
      throw new NotFoundException('No Users Found')
    }

    return users
  }



  // GET SINGLE USER
  async getSingleUser(email : string) {
    const existingUser = await this.usersRepo.findOneBy({email});

    if (!existingUser) {
      throw new NotFoundException("You Don't Have an Account");
    }

    return existingUser;
  }
  // CREATE NEW USER
  // UPDATE USER
  // DELETE USER
}
