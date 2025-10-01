import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Company } from "../../enterprise/entities/company";
import type { CompanyRepository } from "../repositories/company";

export class UpdateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ companyId, ...fieldsToUpdate }: Input): Promise<void> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) throw new ResourceNotFoundError("Company not found");

    const updatedCompany = Company.restore({
      id: company.id,
      companyName: fieldsToUpdate.companyName ?? company.companyName,
      cnpj: fieldsToUpdate.cnpj ?? company.cnpj,
      zipCode: fieldsToUpdate.zipCode ?? company.zipCode,
      city: fieldsToUpdate.city ?? company.city,
      state: fieldsToUpdate.state ?? company.state,
      neighborhood: fieldsToUpdate.neighborhood ?? company.neighborhood,
      street: fieldsToUpdate.street ?? company.street,
      complement: fieldsToUpdate.complement ?? company.complement,
    });

    await this.companyRepository.update(updatedCompany);
  }
}

interface Input {
  companyId: string;

  companyName?: string | undefined;
  cnpj?: string | undefined;
  zipCode?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  neighborhood?: string | undefined;
  street?: string | undefined;
  complement?: string | undefined;
}
