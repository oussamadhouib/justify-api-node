import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TextService } from './text.service';
import * as rawbody from 'raw-body';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { textExemple } from '../utils/contants';
import { UserService } from '../user/user.service';

@Controller('api')
export class TextController {
  constructor(
    private readonly textService: TextService,
    private readonly userService: UserService,
  ) {}

  @ApiConsumes('text/plain')
  @ApiBody({
    schema: {
      example: textExemple,
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('justify')
  async justifyText(@Req() req) {
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const nbOfWordsInText = raw.toString().trim().split(/\s+/).length;
      if (req.user.words > 80000)
        throw new HttpException(
          'Payment Required',
          HttpStatus.PAYMENT_REQUIRED,
        );
      await this.userService.updateWords(
        req.user,
        req.user.words + nbOfWordsInText,
      );
      const arr = raw.toString().trim().split(/\s+/);
      return this.textService.justify(arr, 80).join('\n');
    }
  }
}
