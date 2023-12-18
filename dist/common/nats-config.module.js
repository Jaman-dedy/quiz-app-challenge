"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsStreamingTransport = void 0;
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
exports.natsStreamingTransport = nestjs_nats_streaming_transport_1.NatsStreamingTransport.register({
    clientId: 'user-service-publisher',
    clusterId: 'my-cluster',
    connectOptions: {
        url: 'http://127.0.0.1:4222',
    },
});
//# sourceMappingURL=nats-config.module.js.map