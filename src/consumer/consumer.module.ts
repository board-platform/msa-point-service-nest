import { forwardRef, Module } from "@nestjs/common";
import { UserSignedUpEventConsumer } from "./user-signed-up-event.consumer";
import { PointModule } from "src/point/point.module";

@Module({
    imports: [forwardRef(() => PointModule)],
    providers: [UserSignedUpEventConsumer],
    exports: [UserSignedUpEventConsumer],
})

export class ConsumerModule {}