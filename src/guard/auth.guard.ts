import { UserService } from './../user/user.service';
import { JWTService } from 'src/utils/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private userService: UserService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<UserType[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        const token = context.switchToHttp().getRequest().headers.authorization;
        if (!token) {
            return false;
        }

        try {
            const decode = JWTService.verify(token, "secret");
            const user = await this.userService.getUserById(decode.id);
            if (!user) {
                return false;
            }
            if (roles && !roles.includes(user.type)) {
                return false;
            }
            
        } catch (error) {
            return false;
        }
        return true

    }

}
