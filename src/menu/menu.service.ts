import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuRepository } from './repository/mongodb/menu.repository';

@Injectable()
export class MenuService {
	constructor(
		private menuRepository: MenuRepository
	) { }

	async create (input: CreateMenuDto): Promise<void> {
		await this.menuRepository.create(input);
	}

	async findAll (): Promise<Array<Menu>> {
		return this.menuRepository.findAll();
	}

	async findOne (id: string): Promise<Menu> {
		return this.menuRepository.findOne(id);
	}

	async update (id: string, input: UpdateMenuDto) {
		await this.menuRepository.update(id, input);
	}

	async remove (id: string) {
		await this.menuRepository.remove(id);
	}
}
