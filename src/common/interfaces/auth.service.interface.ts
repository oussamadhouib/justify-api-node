import { Payload } from './payload';
import { User } from './user.interface';

export interface IAuthService {
  signPayload(payload: Payload): any;
  validateUser(payload: Payload): Promise<User>;
}

export const AUTH_SERVICE_TOKEN = Symbol('AuthService');
