import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeDTO, HomeResponseDTO, UpdateHomeDTO } from './dto/home.dto';

@Injectable()
export class HomeService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getHomes() {
        const homes = await this.prismaService.home.findMany();
        return homes;
    }

    async getHomeById(id: string) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id: id
            }
        });
        if (!home) {
            throw new NotFoundException('Home not found');
        }
        return home;
    }


    async create(body: CreateHomeDTO) {
        const home = await this.prismaService.home.create({
            data: {
                name: "body.name",
                listed_date: new Date(),
                number_of_bathrooms: body.numberOfBathrooms,
                number_of_bedrooms: body.numberOfBedrooms,
                propertyType: body.propertyType,
                land_size: body.land_size,
                price: body.price,
                address: body.address,
                city: body.city,
                realtor_id: "7c2373dd-b1a9-4e29-a19e-1fbcf27c0b2e",
            }
        });
        const homeImages = body.images.map(image => {
            return {
                url: image.url,
                home_id: home.id
            }
        })
        const images = await this.prismaService.image.createMany({
            data: homeImages
        })
        return home;

    }

    async update(id: string, body: UpdateHomeDTO) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id: id
            }
        });
        if (!home) {
            throw new NotFoundException('Home not found');
        }

        const updatedHome = await this.prismaService.home.update({
            where: {
                id: id
            },
            data: body
        });
        return home;
    }


    async delete(id: string) {
        const home = await this.getHomeById(id);
        const deletedHome = await this.prismaService.home.delete({
            where: {
                id: id

            }
        });
        return home;
    }
}