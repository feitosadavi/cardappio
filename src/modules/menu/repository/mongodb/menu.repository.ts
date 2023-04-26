import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMenuDto } from '@/modules/menu/dto/create-menu.dto';
import { IMenuRepository } from './interface';
import { Menu } from '@/modules/menu/entities/menu.entity';

export class MenuRepository implements IMenuRepository {
	constructor(
		@InjectModel('Menu') private readonly menuModel: Model<Menu>,
	) { }

	async findAll (): Promise<Menu[]> {
		return this.menuModel.find({});
	}

	async findOne (id: string): Promise<Menu> {
		return this.menuModel.findById(id).exec();
	}

	async create (input: CreateMenuDto): Promise<void> {
		await this.menuModel.create(input);
	}

	async remove (id: string): Promise<void> {
		await this.menuModel.findByIdAndDelete(id).exec();
	}

	async update (id: string, input: Partial<Menu>): Promise<void> {
		await this.menuModel.findByIdAndUpdate(id, input).exec();
	}
}
