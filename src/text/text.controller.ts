import { Controller, Post, Req } from '@nestjs/common';
import { TextService } from './text.service';
import * as rawbody from 'raw-body';

@Controller('api')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post('justify')
  async create(@Req() req) {
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const arr = raw.toString().trim().split(' ');

      return this.textService.justify(arr, 80).join('\n');
    }
  }
}
