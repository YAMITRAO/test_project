import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('user-login')
  getUser() {
    console.log('User get successfully');
    return {
      message: 'User get successfully',
    };
  }
}
