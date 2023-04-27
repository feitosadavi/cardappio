import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { rootMongooseTestModule } from '@/shared/test-utils/mongoose-test-module';
import { MenuRepository } from '@/modules/menu/repository/mongodb/menu.repository';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { MenuSchema } from '@/modules/menu/repository/mongodb/menu.model';
import { fakeCreateMenuDto } from '@test/mocks/menu.mocks';

describe('MenuRepository', () => {
	let menuRepository: MenuRepository;
	let menuModel: Model<Menu>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MenuRepository,
			],
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }])
			]
		}).compile();

		menuRepository = module.get<MenuRepository>(MenuRepository);
		menuModel = module.get<Model<Menu>>(getModelToken('Menu'));
	});

	describe('findAll', () => {
		it('should return an array of menus', async () => {
			await menuModel.create(fakeCreateMenuDto);
			const menus = await menuRepository.findAll();
			expect(menus[0]._id).toBeTruthy();
		});
	});

	describe('findOne', () => {
		it('should return an array of menus', async () => {
			const createdMenu = await menuModel.create(fakeCreateMenuDto);
			const menu = await menuRepository.findOne(createdMenu._id);
			expect(menu._id).toEqual(createdMenu._id);
		});
	});

	describe('create', () => {
		it('should create a new menu', async () => {
			await menuRepository.create(fakeCreateMenuDto);
			const menu = await menuModel.find({}).exec();
			expect(menu[0]._id).toBeTruthy();
		});
	});

	describe('remove', () => {
		it('should remove an menu given the id', async () => {
			const { _id } = await menuModel.create(fakeCreateMenuDto);
			await menuRepository.remove(_id);
			const menu = await menuModel.findOne({ _id }).exec();
			expect(menu).toBeNull();
		});
	});

	describe('update', () => {
		it('should update an menu given the id', async () => {
			const { _id } = await menuModel.create(fakeCreateMenuDto);
			const input = { name: 'another name' };
			await menuRepository.update(_id, input);
			const menu = await menuModel.findOne({ _id }).exec();
			expect(menu.name).toBe(input.name);
		});
	});
});
