import type { CompanyRepository } from "@/domain/application/repositories/company";
import type { Company } from "@/domain/enterprise/entities/company";

import { PrismaCompanyMapper } from "./dtos/mappers/company";
import { prisma } from "./prisma-client";

export class PrismaCompanyRepository implements CompanyRepository {
  async findById(id: string) {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    });
    if (!company) return null;

    return PrismaCompanyMapper.toEntity(company);
  }

  async findAll() {
    const allCompanies = await prisma.company.findMany();
    return allCompanies.map((company) => PrismaCompanyMapper.toEntity(company));
  }

  async create(company: Company) {
    await prisma.company.create({
      data: {
        id: company.id,

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

  async update(company: Company) {
    await prisma.company.update({
      where: {
        id: company.id,
      },
      data: {
        company_name: company.companyName,
        cnpj: company.cnpj,
        zip_code: company.zipCode,
        city: company.city,
        state: company.state,
        neighborhood: company.neighborhood,
        street: company.street,
        complement: company.complement || null,

        updated_at: new Date(),
      },
    });
  }

  async delete(company: Company) {
    await prisma.company.delete({
      where: {
        id: company.id,
      },
    });
  }
}
