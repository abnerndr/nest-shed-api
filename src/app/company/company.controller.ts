import { Body, Controller, Post } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateCompanyDto } from "./company.dto";

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService
    ) { }

    @ApiBody({ type: CreateCompanyDto })
    @Post('create')
    async createCompany(
        @Body() data: CreateCompanyDto
    ) {
        return await this.companyService.store(data)
    }

}