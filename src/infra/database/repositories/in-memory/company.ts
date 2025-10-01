import type { CompanyRepository } from "@/domain/application/repositories/company";
import type { Company } from "@/domain/enterprise/entities/company";

export class InMemoryCompanyRepository implements CompanyRepository {
  companies: Company[] = [];

  async findAll() {
    return this.companies;
  }

  async create(company: Company) {
    this.companies.push(company);
  }
}
