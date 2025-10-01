import type { Company } from "@/domain/enterprise/entities/company";

export interface CompanyRepository {
  findAll: () => Promise<Company[]>;
  create: (company: Company) => Promise<void>;
}
