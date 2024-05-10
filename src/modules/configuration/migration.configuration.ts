import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigurationService } from './configuration.service';
import { EnvironmentVariables } from './configuration.types';
import { ConfigurationModule } from './configuration.module';

ConfigurationModule.forRoot();

const configService = new ConfigService<EnvironmentVariables>();
const configurationService = new ConfigurationService(configService);

const migrationTypeOrmConfiguration = {
  ...configurationService.getTypeOrmConfiguration
};

export default new DataSource(migrationTypeOrmConfiguration as DataSourceOptions);
