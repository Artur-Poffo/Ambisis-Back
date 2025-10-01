import { faker } from "@faker-js/faker";
import { Company, type CompanyCreateProps } from "../company";

export function makeCompany(
  override: Partial<CompanyCreateProps> = {}
): Company {
  return Company.create({
    companyName: faker.company.name(),
    cnpj: faker.string.uuid(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    neighborhood: faker.word.sample(),
    street: faker.location.street(),
    complement: undefined,
    ...override,
  });
}
