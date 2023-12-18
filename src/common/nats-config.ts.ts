// nats-config.ts

import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';

export const natsStreamingTransport = NatsStreamingTransport.register({
  clientId: 'user-service-publisher',
  clusterId: 'my-cluster',
  connectOptions: {
    url: 'http://127.0.0.1:4222',
  },
});
