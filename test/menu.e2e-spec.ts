import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { Model } from 'mongoose';

import { rootMongooseTestModule } from '../src/shared/test-utils/mongoose-test-module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { CreateMenuDto, ItemDto } from '../src/menu/dto/create-menu.dto';
import { MenuService } from '../src/menu/menu.service';
import { MenuController } from '../src/menu/menu.controller';
import { MenuSchema } from '../src/menu/repository/mongodb/menu.model';
import { MenuRepository } from '../src/menu/repository/mongodb/menu.repository';
import { Menu } from '../src/menu/entities/menu.entity';

const fakeItemsDto: ItemDto[] = [{
	name: 'caipirinha',
	photos: [faker.image.food()],
	desc: faker.lorem.sentence(),
	price: faker.datatype.number(),
	status: faker.datatype.boolean()
}, {
	name: 'martini',
	photos: [faker.image.food()],
	desc: faker.lorem.sentence(),
	price: faker.datatype.number(),
	status: faker.datatype.boolean()
}];

const fakeCreateMenuDto: CreateMenuDto = {
	name: 'drinks',
	restaurantId: faker.datatype.uuid(),
	status: true,
	items: [fakeItemsDto[0]]
};


describe('AppController (e2e)', () => {
	let app: INestApplication;
	let menuModel: Model<Menu>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }]),
			],
			controllers: [MenuController],
			providers: [MenuService, MenuRepository],
		}).compile();

		menuModel = moduleFixture.get<Model<Menu>>(getModelToken('Menu'));

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (POST)', () => {
		return request(app.getHttpServer())
			.post('/menu')
			.send(fakeCreateMenuDto)
			.expect(201);
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/menu')
			.expect(200);
	});

	it('/:id (GET)', async () => {
		const { _id } = await menuModel.create(fakeCreateMenuDto);
		return request(app.getHttpServer())
			.get(`/menu/${_id}`)
			.expect(200);
	});


	it('/:id (UPDATE)', async () => {
		const { _id } = await menuModel.create(fakeCreateMenuDto);
		return request(app.getHttpServer())
			.patch(`/menu/${_id}`)
			.send({ name: 'meats' })
			.expect(200);
	});

	it('/:id (DELETE)', async () => {
		const { _id } = await menuModel.create(fakeCreateMenuDto);
		return request(app.getHttpServer())
			.delete(`/menu/${_id}`)
			.expect(200);
	});
});
