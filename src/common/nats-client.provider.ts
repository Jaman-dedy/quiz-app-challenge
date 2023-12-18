import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

export const createNatsClient = (): ClientProxy => {
  return ClientProxyFactory.create({
    transport: Transport.NATS,
    options: {
      url: 'nats://0.0.0.0:4222'
    },
  });
};