import { Company } from "@/domain/enterprise/entities/company";
import type { PrismaCompanyDto } from "../company";

export class PrismaCompanyMapper {
  static toEntity(prismaCompany: PrismaCompanyDto): Company {
    return Company.restore({
      id: prismaCompany.id,
      companyName: prismaCompany.company_name,
      cnpj: prismaCompany.cnpj,
      zipCode: prismaCompany.zip_code,
      city: prismaCompany.city,
      state: prismaCompany.state,
      neighborhood: prismaCompany.neighborhood,
      street: prismaCompany.street,
      complement: prismaCompany.complement,
    });
  }
}
