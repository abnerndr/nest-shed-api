import { ApiProperty } from "@nestjs/swagger";

export class CreateStockDto {
    @ApiProperty()
    item_name: string;

    @ApiProperty()
    item_value: string;

    @ApiProperty()
    item_description?: string;

    @ApiProperty()
    item_qnt: string;

    @ApiProperty()
    item_validity?: string;

    @ApiProperty()
    item_picture_url?: string;
}