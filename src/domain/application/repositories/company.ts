import type { Company } from "@/domain/enterprise/entities/company";

export interface CompanyRepository {
  findById: (id: string) => Promise<Company | null>;
  findAll: () => Promise<Company[]>;
  create: (company: Company) => Promise<void>;
  update: (company: Company) => Promise<void>;
}
