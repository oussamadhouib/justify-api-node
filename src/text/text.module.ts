import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [AuthModule , UserModule],
  controllers: [TextController],
  providers: [TextService]
})
export class TextModule {}
