import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

export interface EnvironmentalLicenseRepository {
  findById: (id: string) => Promise<EnvironmentalLicense | null>;
  findAllFromCompany: (companyId: string) => Promise<EnvironmentalLicense[]>;
  create: (environmentalLicense: EnvironmentalLicense) => Promise<void>;
  update: (environmentalLicense: EnvironmentalLicense) => Promise<void>;
  delete: (environmentalLicense: EnvironmentalLicense) => Promise<void>;
}
