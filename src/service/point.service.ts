import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PointService {

  constructor(private prisma: PrismaService) {}

  async addPoints(userId: bigint, amount: number) {
    return this.prisma.point.upsert({
      where: { userId },
      create: {
        userId,
        amount
      },
      update: {
        amount: {
          increment: amount
        }
      }
    });
  }

  async deductPoints(userId: bigint, amount: number) {
    const result = await this.prisma.point.updateMany({
      where: { 
        userId,
        amount: {
          gte: amount
        }
      },
      data: {
        amount: {
          decrement: amount
        }
      }
    });

    if (result.count === 0) {
      const exists = await this.prisma.point.findUnique({
        where: { userId }
      });

      if (!exists) {
        throw new Error("사용자의 포인트 정보를 찾을 수 없습니다.");
      }

      throw new Error("포인트가 부족합니다.");
    }
    
    return this.prisma.point.findUnique({ where: { userId }});
  }
}