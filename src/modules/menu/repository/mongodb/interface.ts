import { Menu } from '@/modules/menu/entities/menu.entity';
import { IGenericRepository } from '@/shared/generic-repository';

export abstract class IMenuRepository extends IGenericRepository<Menu> { }