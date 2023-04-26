import { Schema } from 'mongoose';
import { Item, Menu } from '@/modules/menu/entities/menu.entity';

export const ItemSchema = new Schema<Item>({
	name: { type: String, required: true },
	photos: [{ type: String }],
	desc: { type: String, required: true },
	price: { type: Number, required: true },
	status: { type: Boolean, default: true },
});

export const MenuSchema = new Schema<Menu>({
	name: { type: String, required: true },
	restaurantId: { type: String, required: true },
	items: [ItemSchema],
	status: { type: Boolean, default: true },
});
