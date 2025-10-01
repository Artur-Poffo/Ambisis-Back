import { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";
import type { PrismaEnvironmentalLicenseDto } from "../environmental-license";

export class PrismaEnvironmentalLicenseMapper {
  static toEntity(
    prismaEnvironmentalLicense: PrismaEnvironmentalLicenseDto
  ): EnvironmentalLicense {
    return EnvironmentalLicense.restore({
      id: prismaEnvironmentalLicense.id,
      licenseNumber: prismaEnvironmentalLicense.license_number,
      environmentalAgency: prismaEnvironmentalLicense.environmental_agency,
      companyId: prismaEnvironmentalLicense.company_id,
      issuedAt: prismaEnvironmentalLicense.issued_at,
      validUntil: prismaEnvironmentalLicense.valid_until,
    });
  }
}
