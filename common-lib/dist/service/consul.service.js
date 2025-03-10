"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsulService = void 0;
const consul_1 = __importDefault(require("consul"));
class ConsulService {
    constructor(logger, options) {
        this.logger = logger;
        this.consul = new consul_1.default({ host: options.host, port: options.port });
        this.options = options;
    }
    async onModuleInit() {
        await this.registerService();
    }
    async registerService() {
        const { id, name, host, port, healthCheckPath, interval = '10s', timeout = '5s', } = this.options.service;
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
        }
        catch (error) {
            this.logger.error('Error registering service with Consul', error.stack);
        }
    }
    async deregisterService() {
        const { id, name } = this.options.service;
        try {
            await this.consul.agent.service.deregister(id);
            this.logger.log(`Service ${name} deregistered from Consul`);
        }
        catch (error) {
            this.logger.error(`Error de-registering service ${name} from Consul:`, error.stack);
        }
    }
}
exports.ConsulService = ConsulService;
//# sourceMappingURL=consul.service.js.map