import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (config: ConfigurationService) => config.getWinstonConfiguration
    })
  ]
})
export class LoggerModule {}
