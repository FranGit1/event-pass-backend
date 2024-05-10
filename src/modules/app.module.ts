import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ExampleModule } from './example/example.module';
import { LoggerModule } from './logger/logger.module';
import { OrmModule } from './orm/orm.module';
import { AutoMapperModule } from './automapper/automapper.module';

/**
 * Core modules which are mandatory in order for the application to run.
 */
const coreModules = [ConfigurationModule, OrmModule, LoggerModule, AutoMapperModule];

/**
 * Application modules containing the business logic.
 */
const appModules = [AuthModule, ExampleModule];

@Module({
  imports: [...coreModules, ...appModules]
})
export class AppModule {}
