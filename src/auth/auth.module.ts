import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AUTH_SERVICE_TOKEN } from '../common/interfaces/auth.service.interface';

const AuthServiceProvider = {
  provide: AUTH_SERVICE_TOKEN,
  useClass: AuthService,
};
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthServiceProvider, JwtStrategy],
  exports: [JwtStrategy, AuthServiceProvider],
})
export class AuthModule {}
