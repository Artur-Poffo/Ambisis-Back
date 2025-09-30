import type { UseCase } from "@/core/usecases/usecase";
import { Company } from "@/domain/enterprise/entities/company";
import type { CompanyRepository } from "../repositories/company";

export class CreateCompanyUseCase implements UseCase<Input, Output> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(params: Input): Promise<Output> {
    const createdCompany = Company.create(params);
    this.companyRepository.create(createdCompany);

    return { companyId: createdCompany.id };
  }
}

interface Input {
  companyName: string;
  cnpj: string;

  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  complement: string | undefined;
}

interface Output {
  companyId: string;
}
