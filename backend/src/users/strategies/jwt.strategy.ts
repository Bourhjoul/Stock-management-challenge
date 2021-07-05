import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies['jwt'];
          console.log('cookie', data);

          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(req: any, payload: any) {
    if (!payload) {
      console.log('nopayload');
      throw new BadRequestException('invalid jwt token');
    }
    if (!req) {
      console.log('nodata');

      throw new BadRequestException('token expired');
    }
    let user = await this.userService.findOne({ id: req.id });
    if (!user) {
      throw new BadRequestException('token expired');
    }
    return user;
  }
}
