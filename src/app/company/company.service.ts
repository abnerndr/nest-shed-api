import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "./company.entity";
import { Repository } from "typeorm";
import { CreateCompanyDto, ResponseCompanyDto } from "./company.dto";
import { format } from "date-fns";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity) private companyService: Repository<CompanyEntity>
    ) { }

    async store(data: CreateCompanyDto): Promise<ResponseCompanyDto> {
        const company = await this.companyService.findOne({ where: { document_number: data.document_number } })

        if (company) {
            throw new HttpException(
                'empresa já existente em nossa base, se ocorreu algum problema tente resetar a senha ou contate o suporte',
                HttpStatus.BAD_REQUEST
            );
        }

        const nowDate = format(new Date(), 'yyyy-MM-dd');
        data.payment_is_valid = true;
        data.last_payment_date = nowDate;
        data.is_active = true;

        const companyData = await this.companyService.save(data)

        return companyData
    }

    async show(dynamicField: string, dynamicValue: string): Promise<ResponseCompanyDto> {
        let condition: any = {}
        condition[dynamicField] = dynamicValue
        return await this.companyService.findOne({ where: condition })
    }
}