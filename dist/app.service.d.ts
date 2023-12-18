import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
export declare class AppService {
    private publisher;
    constructor(publisher: Publisher);
    getHello(): string;
}
