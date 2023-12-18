"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNatsClient = void 0;
const microservices_1 = require("@nestjs/microservices");
const createNatsClient = () => {
    return microservices_1.ClientProxyFactory.create({
        transport: microservices_1.Transport.NATS,
        options: {
            url: 'nats://0.0.0.0:4222'
        },
    });
};
exports.createNatsClient = createNatsClient;
//# sourceMappingURL=nats-client.provider.js.map