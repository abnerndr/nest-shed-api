import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto, ShowCompanyDto } from './company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiBody({ type: CreateCompanyDto })
  @Post('create')
  async createCompany(@Body() data: CreateCompanyDto) {
    return await this.companyService.store(data);
  }

  @Get('show/:company_id')
  async showCompany(@Param('company_id') companyId: string) {
    return await this.companyService.showRelation('id', companyId);
  }
}
