import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { USER_SERVICE_TOKEN } from '../common/interfaces/user.service.interface';

const UserServiceProvider = {
  provide: USER_SERVICE_TOKEN,
  useClass: UserService,
};
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserServiceProvider],
  exports: [UserServiceProvider],
})
export class UserModule {}
