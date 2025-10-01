import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { EnvironmentalLicense } from "../../enterprise/entities/environmental-license";
import type { EnvironmentalLicenseRepository } from "../repositories/environmental-license";

export class UpdateEnvironmentalLicenseUseCase {
  constructor(
    private readonly environmentalLicenseRepository: EnvironmentalLicenseRepository
  ) {}

  async execute({ licenseId, ...fieldsToUpdate }: Input): Promise<void> {
    const environmentalLicense =
      await this.environmentalLicenseRepository.findById(licenseId);
    if (!environmentalLicense)
      throw new ResourceNotFoundError("Environmental License not found");

    const updatedEnvironmentalLicense = EnvironmentalLicense.restore({
      id: environmentalLicense.id,
      licenseNumber:
        fieldsToUpdate.licenseNumber ?? environmentalLicense.licenseNumber,
      environmentalAgency:
        fieldsToUpdate.environmentalAgency ??
        environmentalLicense.environmentalAgency,

      companyId: environmentalLicense.companyId,

      issuedAt: fieldsToUpdate.issuedAt ?? environmentalLicense.issuedAt,
      validUntil: fieldsToUpdate.validUntil ?? environmentalLicense.validUntil,
    });

    await this.environmentalLicenseRepository.update(
      updatedEnvironmentalLicense
    );
  }
}

interface Input {
  licenseId: string;

  licenseNumber?: string | undefined;
  environmentalAgency?: string | undefined;

  issuedAt?: Date | undefined;
  validUntil?: Date | undefined;
}
