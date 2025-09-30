import type { Company } from "@/domain/enterprise/entities/company";

export interface CompanyRepository {
  create: (company: Company) => Promise<void>;
}
