import { UserIntercetors } from './interceptors/user.interceptors';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserIntercetors],
  exports: [UserService, UserIntercetors]
})
export class UserModule { }
