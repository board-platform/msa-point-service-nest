import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { UserSignedUpEventConsumer } from "src/consumer/user-signed-up-event.consumer";

@Injectable()
export class KafkaConsumerRunner implements OnModuleInit {
  constructor(
    @Inject('KAFKA_CONSUMER')
    private readonly consumer,
    private readonly userSignedUpEventConsumer: UserSignedUpEventConsumer,
  ) {}

  async onModuleInit() {
    await this.consumer.subscribe({
      topic: 'user.signed-up',
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ message, topic }) => {
        const value = message.value?.toString();
        if (!value) return;

        if (topic === 'user.signed-up') {
            await this.userSignedUpEventConsumer.consume(value);
          }
      },
    });
  }
}