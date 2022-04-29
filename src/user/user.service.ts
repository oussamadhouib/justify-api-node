import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/interfaces/user.interface';
import { LoginDTO } from '../auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../common/interfaces/payload';
import { Cron } from '@nestjs/schedule';
import { IUserService } from '../common/interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  private readonly logger = new Logger('User');

  async create(createUserDto: CreateUserDto) : Promise<User>{
    const user = await this.findOne(createUserDto.email).exec();
    if (user) {
      throw new HttpException('User exist', HttpStatus.NOT_FOUND);
    }
    let createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findOne(email: string) {
    return this.userModel.findOne({ email })
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

  @Cron('0 0 * * *')
  async resetWords() : Promise<void>{
    await this.userModel.updateMany({}, { words: 0 }).exec()
    this.logger.debug('Reset Words =====>  Called every day');
  }

  updateWords(user: User, newWords: number)  {
    return this.userModel.findOneAndUpdate(
      { _id: user._id },
      { words: newWords },
      { new: true },
    );
  }
}
