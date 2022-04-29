import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TextService } from './text.service';
import * as rawbody from 'raw-body';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { rateLimit, textExemple } from '../common/utils/contants';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../common/interfaces/user.service.interface';
import {
  ITextService,
  TEXT_SERVICE_TOKEN,
} from '../common/interfaces/text.service.interface';

@Controller('api')
export class TextController {
  constructor(
    @Inject(TEXT_SERVICE_TOKEN)
    private readonly textService: ITextService,
    @Inject(USER_SERVICE_TOKEN)
    private userService: IUserService,
  ) {}

  @ApiBearerAuth()
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
      if (req.user.words > rateLimit)
        throw new HttpException(
          'Payment Required',
          HttpStatus.PAYMENT_REQUIRED,
        );
      // update num of words used
      await this.userService
        .updateWords(req.user, req.user.words + nbOfWordsInText)
        .exec();
      // turn text into array of words
      const arr = raw.toString().trim().split(/\s+/);
      return this.textService.justify(arr, 80).join('\n');
    }
  }
}
