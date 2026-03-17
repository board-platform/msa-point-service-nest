import { forwardRef, Module } from "@nestjs/common";
import { PointService } from "./point.service";
import { PointInternalController } from "./point.internal.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { KafkaModule } from "src/kafka/kafka.module";

@Module({
    imports: [PrismaModule, forwardRef(() => KafkaModule)],
    controllers:[PointInternalController],
    providers: [PointService],
    exports: [PointService],
})

export class PointModule {}