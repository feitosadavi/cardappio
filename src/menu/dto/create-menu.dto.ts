import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsArray()
	photos: string[];

	@IsString()
	desc: string;

	@IsNumber()
	price: number;

	@IsNumber()
	status: boolean;
}

export class CreateMenuDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	restaurantId: string;

	@ValidateNested({ each: true })
	@Type(() => Array<ItemDto>)
	items: Array<ItemDto>;

	@IsNumber()
	status: boolean;
}
