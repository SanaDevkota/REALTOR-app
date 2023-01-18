import { UserModule } from './../user/user.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  
  imports: [PrismaModule,UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
