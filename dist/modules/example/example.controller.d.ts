import { HttpResponse } from 'src/shared/http/http-response';
import { PrivateRouteRequestDto } from './dtos/request/private-route.req.dto';
import { PrivateRouteResponseDto } from './dtos/response/private-route.res.dto';
import { PublicRouteResponseDto } from './dtos/response/public-route.res.dto';
import { ExampleService } from './example.service';
import { AuthService } from '../auth/auth.service';
import { Mapper } from '@automapper/core';
import { JwtRouteResponseDto } from './dtos/response/jwt-route.res.dto';
export declare class ExampleController {
    private readonly autoMapper;
    private readonly exampleService;
    private readonly authService;
    constructor(autoMapper: Mapper, exampleService: ExampleService, authService: AuthService);
    privateRoute(body: PrivateRouteRequestDto): Promise<HttpResponse<PrivateRouteResponseDto>>;
    publicRoute(id: number): Promise<HttpResponse<PublicRouteResponseDto>>;
    generateJwt(): Promise<HttpResponse<JwtRouteResponseDto>>;
}
