import { UserService } from './../user.service';
import JWTService from 'src/utils/jwt';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs"

@Injectable()
export class UserIntercetors implements NestInterceptor {
    constructor(
        private readonly userService: UserService
    ) {

    }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        // get jwt 
        const jwt = req.headers?.authorization && req.headers?.authorization?.split(" ")[1];

        if (!jwt) {
            throw new UnauthorizedException("Unauthorized");
        }
        // verify jwt
        const userId = JWTService.verify(jwt, "secret");
        if (!userId) {
            throw new UnauthorizedException("Unauthorized");
        }
        // get user from db
        const user = await this.userService.getUserById(userId.id)
        if (!user) {
            throw new UnauthorizedException("Unauthorized");
        }

        // pass the jwt to the next middleware
        req.user = user
        return next.handle();
    }
}