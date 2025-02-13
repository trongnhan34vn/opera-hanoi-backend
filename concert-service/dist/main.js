"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const path = require("node:path");
const process = require("node:process");
const common_lib_1 = require("common-lib");
const common_1 = require("@nestjs/common");
const error_controller_1 = require("./controller/error.controller");
const envFilePath = '../.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
async function bootstrap() {
    const logger = new common_lib_1.LoggerFactory('default');
    logger.log('Starting Nest application...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(logger);
    logger.log('App successfully configured Logger');
    app.useGlobalFilters(new error_controller_1.ErrorController(app.get(common_lib_1.HttpResponseFactory)));
    logger.log('App successfully configured Filters');
    app.useGlobalInterceptors(new common_lib_1.LogAspectInterceptor());
    logger.log('App successfully configured Interceptors');
    logger.log(`Nest app started with port [${process.env.CONCERT_SERVICE_PORT}]`);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    await app.listen(process.env.CONCERT_SERVICE_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map