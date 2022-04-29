import { Inject, Injectable } from '@nestjs/common';
import { Payload } from '../common/interfaces/payload';
import { sign } from 'jsonwebtoken';
import { IAuthService } from '../common/interfaces/auth.service.interface';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../common/interfaces/user.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private userService: IUserService,
  ) {}

  signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  validateUser(payload: Payload) {
    return this.userService.findByPayload(payload);
  }
}
