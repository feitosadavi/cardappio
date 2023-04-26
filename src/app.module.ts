import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { MenuModule } from './modules/menu/menu.module';

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10
		}),
		MenuModule
	]
})
export class AppModule {}
