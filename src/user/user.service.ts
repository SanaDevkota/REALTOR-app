import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ){

    }

    async getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }
    
}
