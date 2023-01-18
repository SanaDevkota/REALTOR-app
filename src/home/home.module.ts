import { UserModule } from './../user/user.module';
import { UserIntercetors } from './../user/interceptors/user.interceptors';
import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [UserModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
