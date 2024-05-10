import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => configurationService.getJwtConfiguration
    })
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
