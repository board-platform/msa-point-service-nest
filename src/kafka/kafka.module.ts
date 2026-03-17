import { Module } from "@nestjs/common";
import { kafkaConsumerProvider } from "./consumer.provider";
import { KafkaConsumerRunner } from "./consumer.runner";
import { ConsumerModule } from "src/consumer/consumer.module";

@Module({
    imports: [ConsumerModule],
    providers: [kafkaConsumerProvider, KafkaConsumerRunner],
})

export class KafkaModule {}