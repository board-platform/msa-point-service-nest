import { Module } from '@nestjs/common';
import { PointService } from './point/point.service';
import { PrismaService } from './prisma/prisma.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { PointModule } from './point/point.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), KafkaModule, HealthCheckModule, PointModule],
})
export class AppModule {}
