import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../user/auth.service';

@Injectable()
export class AdminGuard extends AuthGuard {
  constructor(authService: AuthService) {
    super(authService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('You do not have admin privileges');
    }

    return true;
  }
}
