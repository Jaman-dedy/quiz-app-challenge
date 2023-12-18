import { AppService } from './app.service';
import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    stationCreatedHandler(data: {
        id: number;
        name: string;
    }, context: NatsStreamingContext): Promise<void>;
}
