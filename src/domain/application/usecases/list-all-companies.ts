import type { UseCase } from "@/core/usecases/usecase";
import { Company } from "@/domain/enterprise/entities/company";
import type { CompanyRepository } from "../repositories/company";

export class ListAllCompaniesUseCase implements UseCase<undefined, Output> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<Output> {
    // Em sistemas maiores, com listas enormes, a paginação e filtros idealmente seriam feitos pelo back-end, mas vou fazer pelo lado do cliente pela simplicidade
    const allCompanies = await this.companyRepository.findAll();
    return { companies: allCompanies };
  }
}

interface Output {
  companies: Company[];
}
