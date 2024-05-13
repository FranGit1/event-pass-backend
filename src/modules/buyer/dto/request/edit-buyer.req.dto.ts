import { PartialType } from "@nestjs/swagger";
import { CreateBuyerDto } from "./create-buyer.req.dto";
export class UpdateBuyerDto extends PartialType(CreateBuyerDto) {}
