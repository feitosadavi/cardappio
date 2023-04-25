export class Item {
	name: string;
	photos: string[];
	desc: string;
	price: number;
	status: boolean;
}

export class Menu {
	_id: string;
	name: string;
	restaurantId: string;
	items: Array<Item>;
	status: boolean;
}
