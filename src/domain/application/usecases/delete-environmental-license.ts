import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import type { EnvironmentalLicenseRepository } from "../repositories/environmental-license";

export class DeleteEnvironmentalLicense {
  constructor(
    private readonly environmentalLicenseRepository: EnvironmentalLicenseRepository
  ) {}

  async execute({ licenseId }: Input): Promise<void> {
    const environmentalLicense =
      await this.environmentalLicenseRepository.findById(licenseId);
    if (!environmentalLicense)
      throw new ResourceNotFoundError("Environmental License not found");

    await this.environmentalLicenseRepository.delete(environmentalLicense);
  }
}

interface Input {
  licenseId: string;
}
