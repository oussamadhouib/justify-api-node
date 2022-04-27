import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  validateUser(payload: Payload) {
    return this.userService.findByPayload(payload);
  }
}
