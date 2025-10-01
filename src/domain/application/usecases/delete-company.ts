import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import type { CompanyRepository } from "../repositories/company";

export class DeleteCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ companyId }: Input): Promise<void> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) throw new ResourceNotFoundError("Company not found");

    await this.companyRepository.delete(company);
  }
}

interface Input {
  companyId: string;
}
