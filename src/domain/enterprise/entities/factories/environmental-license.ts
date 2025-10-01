import { faker } from "@faker-js/faker";
import {
  EnvironmentalLicense,
  type EnvironmentalLicenseCreateProps,
} from "../environmental-license";

export function makeEnvironmentalLicense(
  override: Partial<EnvironmentalLicenseCreateProps> = {}
): EnvironmentalLicense {
  return EnvironmentalLicense.create({
    licenseNumber: faker.string.uuid(),
    environmentalAgency: faker.company.name(),
    companyId: faker.string.uuid(),
    issuedAt: faker.date.past(),
    validUntil: faker.date.future(),
    ...override,
  });
}
