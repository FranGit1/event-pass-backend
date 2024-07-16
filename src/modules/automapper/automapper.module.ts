import {classes} from '@automapper/classes';
import {AutomapperModule} from '@timonmasberg/automapper-nestjs';
import {Module} from '@nestjs/common';
import {AutomapperProfileTypes} from "./automappper.profile";

@Module({
    imports: [
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        })
    ],
    providers: [AutomapperProfileTypes],


})
export class AutoMapperModule {
}
