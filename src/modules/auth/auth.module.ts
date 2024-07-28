import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

import {JwtStrategy} from './jwt.strategy';
import {ConfigurationModule} from '../configuration/configuration.module';
import {ConfigurationService} from '../configuration/configuration.service';
import {AuthService} from './auth.service';
import {BuyerModule} from "../buyer/buyer.module";
import {AuthController} from "./auth.controller";
import {OrganizerModule} from "../organizer/organizer.module";
import {UserLogsModule} from "../user-logs/user-logs.module";
import {AutoMapperModule} from "../automapper/automapper.module";

@Module({
    imports: [
        PassportModule,
        ConfigurationModule,
        AutoMapperModule,
        BuyerModule,
        OrganizerModule,
        UserLogsModule,
        JwtModule.registerAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: async (configurationService: ConfigurationService) => configurationService.getJwtConfiguration
        })
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [AuthService]
})
export class AuthModule {
}
