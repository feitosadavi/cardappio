import { Test } from '@nestjs/testing';
import { MenuController } from '@/modules/menu/menu.controller';
import { MenuService } from '@/modules/menu/menu.service';
import { UpdateMenuDto } from '@/modules/menu/dto/update-menu.dto';
import { faker } from '@faker-js/faker';
import { fakeCreateMenuDto, fakeMenus } from '@test/mocks/menu.mocks';

describe('MenuController', () => {
	let sut: MenuController;
	let menuService: MenuService;

	const mockMenuService = {
		create: jest.fn().mockImplementation(() => Promise.resolve()),
		findAll: jest.fn().mockImplementation(() => Promise.resolve(fakeMenus)),
		findOne: jest.fn().mockImplementation(() => Promise.resolve(fakeMenus[0])),
		update: jest.fn().mockImplementation((input) => ({ ...fakeCreateMenuDto, ...input })),
		remove: jest.fn().mockImplementation(() => Promise.resolve()),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [MenuController],
			providers: [{
				provide: MenuService,
				useValue: mockMenuService
			}]
		}).compile();

		menuService = moduleRef.get<MenuService>(MenuService);
		sut = moduleRef.get<MenuController>(MenuController);
	});

	describe('create', () => {
		it('should call service create with correct input', async () => {
			const spy = jest.spyOn(menuService, 'create');
			await sut.create(fakeCreateMenuDto);
			expect(spy).toHaveBeenCalledWith(fakeCreateMenuDto);
		});
	});

	describe('findAll', () => {
		it('should call service findAll', async () => {
			const spy = jest.spyOn(menuService, 'findAll');
			await sut.findAll();
			expect(spy).toBeCalled();
		});

		it('should return menus from service findAll', async () => {
			jest.spyOn(menuService, 'findAll').mockResolvedValueOnce(fakeMenus);
			const res = await sut.findAll();
			expect(res).toEqual(fakeMenus);
		});
	});

	describe('findOne', () => {
		it('should call service findOne', async () => {
			const spy = jest.spyOn(menuService, 'findOne');
			await sut.findOne('any_id');
			expect(spy).toBeCalled();
		});

		it('should return one menu from service findOne', async () => {
			jest.spyOn(menuService, 'findOne').mockResolvedValueOnce(fakeMenus[0]);
			const res = await sut.findOne('any_id');
			expect(res).toEqual(fakeMenus[0]);
		});
	});

	describe('update', () => {
		it('should call service update with correct input', async () => {
			const menuId = faker.datatype.uuid();
			const fakeUpdateMenuDto: UpdateMenuDto = {
				name: 'another name'
			};
			const spy = jest.spyOn(menuService, 'update');
			await sut.update(menuId, fakeUpdateMenuDto);
			expect(spy).toHaveBeenCalledWith(menuId, fakeUpdateMenuDto);
		});
	});

	describe('remove', () => {
		it('should call service remove with correct input', async () => {
			const menuId = faker.datatype.uuid();
			const spy = jest.spyOn(menuService, 'remove');
			await sut.remove(menuId);
			expect(spy).toHaveBeenCalledWith(menuId);
		});
	});
});
