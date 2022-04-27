import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../types/user.interface';
import { LoginDTO } from '../auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    let createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return this.findOne(email);
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.findOne(email).exec();
    if (!user) {
      throw new HttpException('Invalid Email', HttpStatus.NOT_FOUND);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
