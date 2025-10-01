import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

export class RestApiEnvironmentalLicensePresenter {
  static toRestApiResponse(license: EnvironmentalLicense) {
    return {
      id: license.id,
      licenseNumber: license.licenseNumber,
      environmentalAgency: license.environmentalAgency,
      companyId: license.companyId,
      issuedAt: license.issuedAt,
      validUntil: license.validUntil,
    };
  }
}
