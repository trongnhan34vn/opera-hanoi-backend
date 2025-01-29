import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from './config/SkipAuthGuardAnnotationConfig';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/actuator/health')
  @SkipAuth()
  getHello(): string {
    return this.appService.getHello();
  }
}
