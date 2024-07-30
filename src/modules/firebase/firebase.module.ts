import {Module} from "@nestjs/common";

import {FirebaseStorageService} from "./firebase-storage.service";
import {ConfigurationModule} from "../configuration/configuration.module";


@Module({
    imports: [ConfigurationModule],
    providers: [ FirebaseStorageService],
    controllers: [],
    exports: [FirebaseStorageService],
})
export class FirebaseModule {}
