import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';

export abstract class IGenericRepository<T> {
	abstract findAll (): Promise<T[]>;

	abstract findOne (id: string): Promise<T>;

	abstract create (input: CreateMenuDto): Promise<void>;

	abstract remove (id: string): Promise<void>;

	abstract update (id: string, input: Partial<T>): Promise<void>;
}



