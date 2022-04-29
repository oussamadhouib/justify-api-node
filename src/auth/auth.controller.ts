import { Controller, Post, Body, Inject } from '@nestjs/common';
import { IUserService, USER_SERVICE_TOKEN } from '../common/interfaces/user.service.interface';
import { AUTH_SERVICE_TOKEN, IAuthService } from '../common/interfaces/auth.service.interface';
import { LoginDTO } from './dto/login.dto';

@Controller('api')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
    @Inject(USER_SERVICE_TOKEN)
    private userService: IUserService,
  ) {}

  @Post('/token')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { payload, token };
  }
}
