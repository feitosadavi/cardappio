import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { MenuService } from '@/modules/menu/menu.service';
import { MenuRepository } from '@/modules/menu/repository/mongodb/menu.repository';
import { UpdateMenuDto } from '@/modules/menu/dto/update-menu.dto';
import { fakeCreateMenuDto, fakeMenus } from '@test/mocks/menu.mocks';

describe('MenuService', () => {
	let sut: MenuService;
	let menuRepository: MenuRepository;

	const mockMenuRepository = {
		create: jest.fn().mockImplementation(() => Promise.resolve()),
		findAll: jest.fn().mockImplementation(() => Promise.resolve(fakeMenus)),
		findOne: jest.fn().mockImplementation(() => Promise.resolve(fakeMenus[0])),
		update: jest.fn().mockImplementation((input) => ({ ...fakeCreateMenuDto, ...input })),
		remove: jest.fn().mockImplementation(() => Promise.resolve()),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MenuService,
				{
					provide: MenuRepository,
					useValue: mockMenuRepository
				}
			],
		}).compile();

		sut = module.get<MenuService>(MenuService);
		menuRepository = module.get<MenuRepository>(MenuRepository);
	});

	it('should be defined', () => {
		expect(sut).toBeDefined();
	});

	describe('create', () => {
		it('should call service create with correct input', async () => {
			const spy = jest.spyOn(menuRepository, 'create');
			await sut.create(fakeCreateMenuDto[0]);
			expect(spy).toHaveBeenCalledWith(fakeCreateMenuDto[0]);
		});
	});

	describe('findAll', () => {
		it('should call service findAll', async () => {
			const spy = jest.spyOn(menuRepository, 'findAll');
			await sut.findAll();
			expect(spy).toBeCalled();
		});

		it('should return menus from service findAll', async () => {
			const res = await sut.findAll();
			expect(res).toEqual(fakeMenus);
		});
	});

	describe('findOne', () => {
		it('should call service findOne', async () => {
			const spy = jest.spyOn(menuRepository, 'findOne');
			await sut.findOne('any_id');
			expect(spy).toBeCalled();
		});

		it('should return one menu from service findOne', async () => {
			const id = 'any_id';
			const res = await sut.findOne(id);
			expect(res).toEqual(fakeMenus[0]);
		});
	});

	describe('update', () => {
		it('should call service update with correct input', async () => {
			const fakeUpdateMenuDto: UpdateMenuDto = {
				name: 'hotdog'
			};
			const menuId = faker.datatype.uuid();
			const spy = jest.spyOn(menuRepository, 'update');
			await sut.update(menuId, fakeUpdateMenuDto);
			expect(spy).toHaveBeenCalledWith(menuId, fakeUpdateMenuDto);
		});
	});

	describe('remove', () => {
		it('should call service remove with correct input', async () => {
			const menuId = faker.datatype.uuid();
			const spy = jest.spyOn(menuRepository, 'remove');
			await sut.remove(menuId);
			expect(spy).toHaveBeenCalledWith(menuId);
		});
	});
});
