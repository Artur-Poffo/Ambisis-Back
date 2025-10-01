import type { UseCase } from "@/core/usecases/usecase";
import { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";
import type { EnvironmentalLicenseRepository } from "../repositories/environmental-license";

export class CreateEnvironmentalLicenseUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly environmentalLicenseRepository: EnvironmentalLicenseRepository
  ) {}

  async execute(params: Input): Promise<Output> {
    const createdLicense = EnvironmentalLicense.create(params);
    await this.environmentalLicenseRepository.create(createdLicense);

    return { licenseId: createdLicense.id };
  }
}

interface Input {
  licenseNumber: string;
  environmentalAgency: string;
  companyId: string;

  issuedAt: Date;
  validUntil: Date;
}

interface Output {
  licenseId: string;
}
