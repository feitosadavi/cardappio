import * as request from 'supertest';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import { rootMongooseTestModule } from '@/shared/test-utils/mongoose-test-module';
import { MenuService } from '@/modules/menu/menu.service';
import { MenuController } from '@/modules/menu/menu.controller';
import { MenuSchema } from '@/modules/menu/repository/mongodb/menu.model';
import { MenuRepository } from '@/modules/menu/repository/mongodb/menu.repository';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { fakeCreateMenuDto } from '@test/mocks/menu.mocks';


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
