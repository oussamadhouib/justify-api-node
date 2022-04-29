import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback, Strategy } from 'passport-jwt';
import { IAuthService , AUTH_SERVICE_TOKEN} from '../../common/interfaces/auth.service.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
