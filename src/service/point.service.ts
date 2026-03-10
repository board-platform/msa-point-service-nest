import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PointService {

  constructor(private prisma: PrismaService) {}

  async addPoints(userId: number, amount: number) {

    const existing = await this.prisma.point.findUnique({
      where: { userId }
    })

    if (!existing) {
      return this.prisma.point.create({
        data: {
          userId,
          amount
        }
      })
    }

    return this.prisma.point.update({
      where: { userId },
      data: {
        amount: {
          increment: amount
        }
      }
    })
  }

  async deductPoints(userId: number, amount: number) {

    const point = await this.prisma.point.findUnique({
      where: { userId }
    })

    if (!point) {
      throw new Error("사용자의 포인트 정보를 찾을 수 없습니다.")
    }

    if (point.amount < amount) {
      throw new Error("포인트가 부족합니다.")
    }

    return this.prisma.point.update({
      where: { userId },
      data: {
        amount: {
          decrement: amount
        }
      }
    })
  }

}