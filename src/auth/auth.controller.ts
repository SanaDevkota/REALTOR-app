import { UserService } from './../user/user.service';
import BcryptService from 'src/utils/bcrypt';
import { Body, Controller, Param, ParseEnumPipe, Post, UnauthorizedException, Get } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { AuthService } from './auth.service';
import { GenerateProductKeyDTO, LoginDTO, SignupDTO } from './dtos/auth.dto';
import User from 'src/user/decorators/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService:UserService
    ) { }

    @Post("/signup/:userType")
    async signup(@Body() body: SignupDTO, @Param("userType", new ParseEnumPipe(UserType)) userType: UserType) {
        if (userType !== UserType.BUYER) {
            if (!body.productKey) {
                throw new UnauthorizedException("Product key is required");
            }
            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`
            const isValidProductKey = await BcryptService.compare(validProductKey, body.productKey);
            if (!isValidProductKey) {
                throw new UnauthorizedException("Invalid product key");
            }
            const newUser = this.authService.signup(body, userType);

            console.log(newUser);

            return newUser;
        }
    }

    @Post("/login")
    async login(@Body() body: LoginDTO) {
        return this.authService.login(body);
    }

    @Post("/key")
    async generateProductKey(@Body() body: GenerateProductKeyDTO) {
        return this.authService.generateProductKey(body.email, body.userType);
    }

    // me 
    @Get("/me")
    async me(@User() user: string) {
        const me = await this.userService.getUserById(user);
        if (!me) {
            throw new UnauthorizedException("User not found");
        }

        return me;
    }
}