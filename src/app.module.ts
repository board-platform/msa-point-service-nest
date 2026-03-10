import { Module } from '@nestjs/common';
import { PointInternalController } from './controller/point.internal.controller';
import { HealthCheckController } from './controller/health-check.controller';
import { PointService } from './service/point.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PointInternalController, HealthCheckController],
  providers: [PointService, PrismaService],
})
export class AppModule {}
