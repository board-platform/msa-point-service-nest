import { Kafka } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const kafkaConsumerProvider: Provider = {
  provide: 'KAFKA_CONSUMER',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const kafka = new Kafka({
      clientId: 'point-service-consumer',
      brokers:
        configService
          .get<string>('KAFKA_BOOTSTRAP_SERVERS')
          ?.split(',') ?? ['localhost:9092'],
    });

    const consumer = kafka.consumer({ groupId: 'point-service' });
    await consumer.connect();

    return consumer;
  },
};