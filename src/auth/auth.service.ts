import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/LoginDto.dto';
import { UsersService } from 'src/users/users.service';

const scrypt = promisify(crypto.scrypt);
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,


    private usersService : UsersService,
    private jwtService: JwtService,
  ) {}

  // [ 1 ] Signup
  async signup(body: CreateUserDto) {
    // [ 1 ] Check if the user is found
    const users = await this.usersRepo.find();
  
    const existingUser = users.find((user) => user.email == body.email);
    if (existingUser) {
      throw new BadRequestException('User Already Exists');
    }

    const userEmail = body.email;

    // [ 2 ] If the user is not Signed Up Before
    // ( 1 ) create salt
    const salt = randomBytes(32).toString('hex');
    // ( 2 ) create salt
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    // ( 3 ) encrypt the password
    const hashedPassword = salt + '.' + hash.toString('hex');
    // ( 4 ) Generate the token
    const generetedToken = this.jwtService.sign({ userEmail });
    // ( 5 ) save the user 's data
    const userData = {
      ...body,
      token: generetedToken,
      password: hashedPassword,
    };

    const savedUser = this.usersRepo.create(userData);

    return await this.usersRepo.save(savedUser);
  }

  // [ 2 ] Login
  async login(body: LoginDto) {
    const user = await this.usersService.getSingleUser(body.email)

    const [salt, hashedPassword] = user.password.split('.');

    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== hashedPassword) {
      throw new BadRequestException("Email / Password is'nt Correct");
    }

    return user;
  }
}
