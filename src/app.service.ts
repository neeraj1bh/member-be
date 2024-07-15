import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): object {
    return {
      message: 'Welcome to the MemberBase API!',
      time: new Date().toISOString(),
      health: 'OK',
    };
  }
}
