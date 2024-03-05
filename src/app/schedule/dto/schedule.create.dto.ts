import { ApiProperty } from "@nestjs/swagger";
import { ScheduleStatusProps } from "./schedule";

export class CreateScheduleDto {
    @ApiProperty({ default: 'default' })
    status: ScheduleStatusProps;

    @ApiProperty()
    is_notified: boolean;

    @ApiProperty()
    start_date: string;

    @ApiProperty()
    end_date: string;

    @ApiProperty()
    session_time: string;

    @ApiProperty()
    service_category: string;

    @ApiProperty()
    service_name: string;

    @ApiProperty()
    service_price: string;
}
