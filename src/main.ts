import {INestApplication, Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';

import {AppModule} from './modules/app.module';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {EnvironmentVariables} from './modules/configuration/configuration.types';
import {ConfigurationService} from './modules/configuration/configuration.service';
import httpLogger from './modules/logger/http.logger';

function enableCors(app: INestApplication) {
    const origins = [process.env.ADMIN_APPLICATION_URL];
    app.enableCors({
        origin: new RegExp(`(${origins.join('|')})`),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });
}

async function generateDocumentation(app) {
    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('NestJS template API documentation.')
        .setVersion('0.0.1')
        .addServer("/api")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);
}

function parseCookies(app: INestApplication) {
    app.use(cookieParser());
}

function setupGlobalValidationPipe(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
}

function setupLogger(app: INestApplication) {
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
}

async function showProductionWaningLogs(port: number) {
    Logger.warn(`📄 Documentation available at: http://localhost:${port}/documentation`);
    Logger.warn('Documentation has been exposed, assure that this is the wanted behaviour.');
    Logger.warn('HTTP requests are being logged, assure that this is the wanted behaviour.');
}

async function startServer(app: INestApplication, port: number) {
    app.setGlobalPrefix("api");
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

async function bootstrap() {
    ConfigurationModule.forRoot();
    const configService = new ConfigService<EnvironmentVariables>();
    const configurationService = new ConfigurationService(configService);

    const port = configurationService.getBackendApplicationPort;
    const isProduction = configurationService.isProduction;

    const app = await NestFactory.create(AppModule);

    enableCors(app);
    parseCookies(app);
    setupGlobalValidationPipe(app);
    setupLogger(app);

    if (!isProduction) {
        app.use(httpLogger);
        await generateDocumentation(app);
    }

    await startServer(app, port);

    if (!isProduction) showProductionWaningLogs(port);
}

bootstrap();
