import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PointService } from '../point/point.service';
import { AddPointRequestDto } from 'src/dto/add-point-request.dto';
import { DeductPointRequestDto } from 'src/dto/deduct-point-request.dto';

@Controller('internal/points')
export class PointInternalController {
  constructor(private readonly pointService: PointService) {}

  @Post('add')
  @HttpCode(204)
  async addPoints(@Body() dto: AddPointRequestDto): Promise<void> {
    await this.pointService.addPoints(dto.userId, dto.amount);
  }

  @Post('deduct')
  @HttpCode(204)
  async deductPoints(@Body() dto: DeductPointRequestDto): Promise<void> {
    await this.pointService.deductPoints(dto.userId, dto.amount);
  }
}
