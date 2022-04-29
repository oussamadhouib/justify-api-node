import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TEXT_SERVICE_TOKEN } from '../common/interfaces/text.service.interface';

const TextServiceProvider = {
  provide: TEXT_SERVICE_TOKEN,
  useClass: TextService,
};
@Module({
  imports: [AuthModule, UserModule],
  controllers: [TextController],
  providers: [TextServiceProvider],
})
export class TextModule {}
