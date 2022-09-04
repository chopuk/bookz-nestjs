import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login( @Body('email') email: string, @Body('password') password: string ) {

    let user = await this.userService.login(email);
    if (!user) return { "error": "User does not seem to exist"};

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) return { "error": "You seem to have entered the wrong password"};

    const token = jwt.sign({ userId: user._id, email: user.email }, 
      'mysimplekey', 
      {
          expiresIn: '1h' 
      }
    );
    return { user, token: token, tokenExpiration: 1 };
    
  }

  @Post('register')
  async createUser( @Body() newUser: UserDto ) {

    const user = await this.userService.registerUser(newUser);
    if (!user.id) return { "error": "User wasn't created for some reason" };

    return user;
    
  }

}