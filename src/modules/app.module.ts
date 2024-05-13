import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { LoggerModule } from "./logger/logger.module";
import { OrmModule } from "./orm/orm.module";
import { AutoMapperModule } from "./automapper/automapper.module";
import { EventModule } from "./event/event.module";
import { LocationModule } from "./location/location.module";
import { TopicModule } from "./topic/topic.module";

/**
 * Core modules which are mandatory in order for the application to run.
 */
const coreModules = [
  ConfigurationModule,
  OrmModule,
  LoggerModule,
  AutoMapperModule,
];

/**
 * Application modules containing the business logic.
 */
const appModules = [AuthModule, EventModule, LocationModule, TopicModule];

@Module({
  imports: [...coreModules, ...appModules],
})
export class AppModule {}
