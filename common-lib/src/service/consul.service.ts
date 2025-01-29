import { LoggerService, OnModuleInit } from '@nestjs/common';
import Consul from 'consul';

export interface ConsulOptions {
  host: string; // Địa chỉ Consul
  port: number; // Cổng Consul
  service: {
    id: string; // ID của service
    name: string; // Tên của service
    host: string;
    port: number; // Cổng của service
    healthCheckPath: string; // Endpoint health check
    interval?: string; // Tần suất kiểm tra
    timeout?: string;
  };
}

export class ConsulService implements OnModuleInit {
  private consul: Consul;
  private options: ConsulOptions;

  constructor(
    private readonly logger: LoggerService,
    options: ConsulOptions,
  ) {
    this.consul = new Consul({ host: options.host, port: options.port });
    this.options = options;
  }

  async onModuleInit() {
    await this.registerService();
  }

  private async registerService() {
    const {
      id,
      name,
      host,
      port,
      healthCheckPath,
      interval = '10s',
      timeout = '5s',
    } = this.options.service;
    try {
      await this.consul.agent.service.register({
        id,
        name,
        port,
        check: {
          checkid: id + '-health-check',
          name: `${name}-health-check`,
          http: `http://${host}:${port}${healthCheckPath}`,
          interval,
          timeout,
        },
      });

      this.logger.log(`Service ${name} registered with Consul`);
    } catch (error) {
      this.logger.error('Error registering service with Consul', error.stack);
    }
  }

  // Hủy đăng ký dịch vụ khỏi Consul
  private async deregisterService() {
    const { id, name } = this.options.service;

    try {
      await this.consul.agent.service.deregister(id);
      this.logger.log(`Service ${name} deregistered from Consul`);
    } catch (error) {
      this.logger.error(
        `Error de-registering service ${name} from Consul:`,
        error.stack,
      );
    }
  }
}
