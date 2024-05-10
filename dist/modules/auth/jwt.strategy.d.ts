import { ConfigurationService } from '../configuration/configuration.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configurationService: ConfigurationService);
    private static extractJwtFromCookie;
    validate(payload: any): Promise<{
        id: any;
    }>;
}
export {};
