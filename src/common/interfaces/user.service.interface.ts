import { LoginDTO } from '../../auth/dto/login.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Payload } from './payload';
import { User } from './user.interface';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findOne(email: string): any;
  findByPayload(payload: Payload): Promise<User>;
  findByLogin(UserDTO: LoginDTO): any;
  sanitizeUser(user: User): any;
  resetWords(): Promise<void>;
  updateWords(user: User, newWords: number): any;
}

export const USER_SERVICE_TOKEN = Symbol('UserService');
