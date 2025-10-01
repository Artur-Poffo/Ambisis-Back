import type { CompanyRepository } from "@/domain/application/repositories/company";
import type { Company } from "@/domain/enterprise/entities/company";
import { prisma } from "../../prisma";
import { PrismaCompanyMapper } from "./dtos/mappers/company";

export class PrismaCompanyRepository implements CompanyRepository {
  async findAll() {
    const allCompanies = await prisma.company.findMany();
    return allCompanies.map((company) => PrismaCompanyMapper.toEntity(company));
  }

  async create(company: Company) {
    await prisma.company.create({
      data: {
        company_name: company.companyName,
        cnpj: company.cnpj,
        zip_code: company.zipCode,
        city: company.city,
        state: company.state,
        neighborhood: company.neighborhood,
        street: company.street,
        complement: company.complement || null,

        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
}
