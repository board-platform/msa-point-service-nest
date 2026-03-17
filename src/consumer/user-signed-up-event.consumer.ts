import { Injectable } from "@nestjs/common";
import { UserSignedUpEvent } from "src/event/user-signed-up.event";
import { PointService } from "src/point/point.service";

@Injectable()
export class UserSignedUpEventConsumer {
    constructor(private readonly pointService: PointService) {}

    async consume(message: string): Promise<void> {
        const event: UserSignedUpEvent = JSON.parse(message);

        const point = await this.pointService.createInitialPoint(event.userId);

        console.log(`포인트 초기화 처리 완료 (userId=${event.userId}, amount=${point.amount})`);
    }
}