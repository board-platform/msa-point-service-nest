import { Injectable } from "@nestjs/common";
import { UserSignedUpEvent } from "src/event/user-signed-up.event";
import { PointService } from "src/point/point.service";

@Injectable()
export class UserSignedUpEventConsumer {
    constructor(private readonly pointService: PointService) {}

    async consume(message: string): Promise<void> {
        const event: UserSignedUpEvent = JSON.parse(message);

        const result = await this.pointService.findByUserId(event.userId);

        if (result) {
          throw new Error("이미 존재하는 사용자입니다.");
        }

        await this.pointService.addPoints(event.userId, 1000);
        console.log('신규포인트 1000 생성 완료');
    }
}