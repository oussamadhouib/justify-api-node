import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! this is Implementation of a REST API that justifies a text passed as a parameter (Tictactrip Test)!';
  }
}
