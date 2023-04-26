import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './repository/mongodb/menu.model';
import { MenuRepository } from './repository/mongodb/menu.repository';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: 'mongodb://xxxxx',
			}),
		}),
		MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }]),
	],
	controllers: [MenuController],
	providers: [MenuService, MenuRepository],
})
export class MenuModule { }
