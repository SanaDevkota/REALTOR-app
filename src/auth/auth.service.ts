import { PrismaService } from './../prisma/prisma.service';
import { LoginDTO, SignupDTO } from './dtos/auth.dto';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserType } from "@prisma/client"
import BcryptService from 'src/utils/bcrypt';
import JWTService from 'src/utils/jwt';



console.log(process.env.PRODUCT_KEY_SECRET);


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,

    ) { }
    async signup(body: SignupDTO, userType: UserType) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (userExists) {
            throw new BadRequestException("User already exists");
        }
        const hashedPassword = await BcryptService.hash(body.password)
        const user = await this.prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                phone: body.phone,
                name: body.name,
                type: userType,
            }
        })
        const token = await JWTService.sign({
            id: user.id, type: user.type
        }, "secret", {
            expiresIn: "1d"
        })
        return token;
    }


    async login(body: LoginDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (!user) {
            throw new BadRequestException("Invalid credentials");
        }
        const passwordMatch = await BcryptService.compare(body.password, user.password)
        if (!passwordMatch) {
            throw new BadRequestException("Invalid credentials");
        }
        const token = await JWTService.sign({
            id: user.id, type: user.type
        }, "secret", {
            expiresIn: "1d"
        })
        return token;
    }



    generateProductKey(email: string, userType: UserType) {
        email = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`
        const hashedEmail = BcryptService.hash(email)
        return hashedEmail;
    }

}
