import { ConfigModule, ConfigService } from "@nestjs/config";
import { DynamicModule, Module } from "@nestjs/common";

import { ConfigurationService } from "./configuration.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: ConfigurationService.validate,
    }),
  ],
  providers: [ConfigurationService, ConfigService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {
  static forRoot(): DynamicModule {
    return ConfigModule.forRoot({
      validate: ConfigurationService.validate,
    });
  }
}
