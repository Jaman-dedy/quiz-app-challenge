// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const user = await this.authService.authenticate(req);

    if (user) {
      req.user = user;
    }

    next();
  }
}
