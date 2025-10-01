import type { UseCase } from "@/core/usecases/usecase";

import type { EnvironmentalLicenseRepository } from "../repositories/environmental-license";
import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

export class ListAllEnvironmentalLicensesFromCompanyUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly environmentalLicenseRepository: EnvironmentalLicenseRepository
  ) {}

  async execute({ companyId }: Input): Promise<Output> {
    const allEnvironmentalLicensesFromCompany =
      await this.environmentalLicenseRepository.findAllFromCompany(companyId);

    return { environmentalLicenses: allEnvironmentalLicensesFromCompany };
  }
}

interface Input {
  companyId: string;
}

interface Output {
  environmentalLicenses: EnvironmentalLicense[];
}
