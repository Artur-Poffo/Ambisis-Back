import type { CompanyRepository } from "@/domain/application/repositories/company";
import type { Company } from "@/domain/enterprise/entities/company";

export class InMemoryCompanyRepository implements CompanyRepository {
  companies: Company[] = [];

  async findById(id: string) {
    const company = this.companies.find((company) => company.id === id);
    if (!company) return null;

    return company;
  }

  async findAll() {
    return this.companies;
  }

  async create(company: Company) {
    this.companies.push(company);
  }

  async update(company: Company) {
    const companyToUpdate = this.companies.findIndex(
      (companyToUpdate) => companyToUpdate.id === company.id
    );
    if (companyToUpdate === -1) return;

    this.companies[companyToUpdate] = company;
  }

  async delete(company: Company) {
    const companyToDelete = this.companies.findIndex(
      (companyToUpdate) => companyToUpdate.id === company.id
    );
    if (companyToDelete === -1) return;

    this.companies.splice(companyToDelete, 1);
  }
}
