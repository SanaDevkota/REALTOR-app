import { UserType } from '@prisma/client';
import { AuthGuard } from './../guard/auth.guard';
import { UserIntercetors } from './../user/interceptors/user.interceptors';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import User from 'src/user/decorators/user.decorator';
import { HomeResponseDTO, CreateHomeDTO, UpdateHomeDTO } from './dto/home.dto';
import { HomeService } from './home.service';
import { Roles } from 'src/decorators/roles.decorators';

@UseInterceptors(UserIntercetors)
@Controller('home')
export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) { }

    @Get()
    async getHomes(@User() user: any) {
        console.log(user);

        const homes = await this.homeService.getHomes();
        return homes.map(home => {
            return new HomeResponseDTO(home);
        });
    }

    @Get(':id')
    async getHomeById(
        @Param("id", ParseUUIDPipe) id: string
    ) {
        const home = await this.homeService.getHomeById(id)
        return home
    }

    @Roles(UserType.ADMIN)
    @UseGuards(AuthGuard)
    @Post("/")
    async createHome(@Body() body: CreateHomeDTO) {
        const home = await this.homeService.create(body);
        return home;
    }

    @Put(":id")
    async updateHome(@Body() body: UpdateHomeDTO, @Param("id", ParseUUIDPipe) id: string) {
        const home = await this.homeService.update(id, body);
        return home;
    }


    @Delete(":id")
    async deleteHome(
        @Param("id", ParseUUIDPipe) id: string
    ) {
        const home = await this.homeService.delete(id);
        return home;
    }





}
