import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  getUsers(): any {
    return [{ id: 0, name: 'abdessamad' }];
  }
}
