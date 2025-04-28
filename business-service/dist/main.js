"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const path = require("node:path");
const process = require("node:process");
const common_1 = require("common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exception_controller_1 = require("./controller/exception.controller");
const envFilePath = '../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
async function bootstrap() {
    const logger = new common_1.LoggerFactory('default');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logger,
        bufferLogs: true,
    });
    app.useLogger(logger);
    logger.log('App successfully configured Logger');
    app.useGlobalFilters(new exception_controller_1.ExceptionController(app.get(common_1.HttpResponseFactory)));
    logger.log('App successfully configured Filter Exception Controller');
    app.useGlobalInterceptors(new common_1.LogAspectInterceptor());
    logger.log('App successfully configured Interceptors');
    logger.log(`Nest app started with port [${process.env.BUSINESS_SERVICE_PORT}]`);
    app.useGlobalPipes(new common_2.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Concert API')
        .setDescription('The concert management API')
        .setVersion('1.0')
        .addTag('concerts')
        .addApiKey({
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
    }, 'x-api-key')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.BUSINESS_SERVICE_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map