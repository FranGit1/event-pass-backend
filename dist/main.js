"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./modules/app.module");
const configuration_module_1 = require("./modules/configuration/configuration.module");
const configuration_service_1 = require("./modules/configuration/configuration.service");
const http_logger_1 = require("./modules/logger/http.logger");
function enableCors(app) {
    const origins = [process.env.ADMIN_APPLICATION_URL];
    app.enableCors({
        origin: new RegExp(`(${origins.join('|')})`),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });
}
async function generateDocumentation(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('NestJS template API documentation.')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('documentation', app, document);
}
function parseCookies(app) {
    app.use(cookieParser());
}
function setupGlobalValidationPipe(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
}
function setupLogger(app) {
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
}
async function showProductionWaningLogs(port) {
    common_1.Logger.warn(`📄 Documentation available at: http://localhost:${port}/documentation`);
    common_1.Logger.warn('Documentation has been exposed, assure that this is the wanted behaviour.');
    common_1.Logger.warn('HTTP requests are being logged, assure that this is the wanted behaviour.');
}
async function startServer(app, port) {
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
async function bootstrap() {
    configuration_module_1.ConfigurationModule.forRoot();
    const configService = new config_1.ConfigService();
    const configurationService = new configuration_service_1.ConfigurationService(configService);
    const port = configurationService.getBackendApplicationPort;
    const isProduction = configurationService.isProduction;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    enableCors(app);
    parseCookies(app);
    setupGlobalValidationPipe(app);
    setupLogger(app);
    if (!isProduction) {
        app.use(http_logger_1.default);
        await generateDocumentation(app);
    }
    await startServer(app, port);
    if (!isProduction)
        showProductionWaningLogs(port);
}
bootstrap();
//# sourceMappingURL=main.js.map