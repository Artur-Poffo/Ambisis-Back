import { InMemoryEnvironmentalLicenseRepository } from "@/infra/database/repositories/in-memory/environmental-license";
import { CreateEnvironmentalLicenseUseCase } from "./create-environmental-license";
import { faker } from "@faker-js/faker";

function makeSut() {
  const environmentalLicenseRepository =
    new InMemoryEnvironmentalLicenseRepository();
  const sut = new CreateEnvironmentalLicenseUseCase(
    environmentalLicenseRepository
  );

  return {
    sut,
    environmentalLicenseRepository,
  };
}

describe("CreateEnvironmentalLicenseUseCase", () => {
  test("Deve criar uma licença ambiental corretamente", async () => {
    const { sut, environmentalLicenseRepository } = makeSut();

    const params = {
      licenseNumber: faker.string.uuid(),
      environmentalAgency: faker.company.name(),
      companyId: faker.string.uuid(),
      issuedAt: faker.date.past(),
      validUntil: faker.date.future(),
    };

    await sut.execute(params);

    const createdLicense = environmentalLicenseRepository.licenses[0];

    expect(createdLicense).toBeDefined();
    expect(createdLicense).toMatchObject({
      licenseNumber: params.licenseNumber,
      environmentalAgency: params.environmentalAgency,
      companyId: params.companyId,
      issuedAt: params.issuedAt,
      validUntil: params.validUntil,
    });
  });
});
