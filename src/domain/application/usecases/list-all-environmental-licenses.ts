import type { UseCase } from "@/core/usecases/usecase";

import type { EnvironmentalLicenseRepository } from "../repositories/environmental-license";
import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

export class ListAllEnvironmentalLicensesUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly environmentalLicenseRepository: EnvironmentalLicenseRepository
  ) {}

  async execute({ companyId }: Input): Promise<Output> {
    const allEnvironmentalLicenses =
      await this.environmentalLicenseRepository.findAll();

    if (!companyId) {
      return { environmentalLicenses: allEnvironmentalLicenses };
    }

    return {
      environmentalLicenses: allEnvironmentalLicenses.filter(
        (environmentalLicense) => environmentalLicense.companyId === companyId
      ),
    };
  }
}

interface Input {
  companyId?: string | undefined;
}

interface Output {
  environmentalLicenses: EnvironmentalLicense[];
}
