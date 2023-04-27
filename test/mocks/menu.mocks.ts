import { CreateMenuDto, ItemDto } from '@/modules/menu/dto/create-menu.dto';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { faker } from '@faker-js/faker';

export const fakeItemsDto: ItemDto[] = [{
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

export const fakeCreateMenuDto: CreateMenuDto = {
	name: 'drinks',
	restaurantId: faker.datatype.uuid(),
	status: true,
	items: [fakeItemsDto[0]]
};

export const fakeMenus: Menu[] = [{
	_id: faker.datatype.uuid(),
	status: true,
	...fakeCreateMenuDto
}];