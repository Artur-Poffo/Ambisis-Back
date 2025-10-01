import { InMemoryEnvironmentalLicenseRepository } from "@/infra/database/repositories/in-memory/environmental-license";
import { makeEnvironmentalLicense } from "@/domain/enterprise/entities/factories/environmental-license";
import { UpdateEnvironmentalLicenseUseCase } from "./update-environmental-license";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

function makeSut() {
  const environmentalLicenseRepository =
    new InMemoryEnvironmentalLicenseRepository();
  const sut = new UpdateEnvironmentalLicenseUseCase(
    environmentalLicenseRepository
  );

  return {
    sut,
    environmentalLicenseRepository,
  };
}

describe("UpdateEnvironmentalLicenseUseCase", () => {
  test("Deve atualizar uma licença ambiental existente", async () => {
    const { sut, environmentalLicenseRepository } = makeSut();

    const environmentalLicense = makeEnvironmentalLicense();
    environmentalLicenseRepository.create(environmentalLicense);

    const params = {
      licenseId: environmentalLicense.id,
      licenseNumber: "Updated License Number",
      environmentalAgency: "Updated Environmental Agency",
      issuedAt: new Date("2023-01-01"),
      validUntil: new Date("2024-01-01"),
    };

    await sut.execute(params);

    const updatedEnvironmentalLicense =
      environmentalLicenseRepository.licenses[0];

    expect(updatedEnvironmentalLicense).toMatchObject({
      licenseNumber: params.licenseNumber,
      environmentalAgency: params.environmentalAgency,
      issuedAt: params.issuedAt,
      validUntil: params.validUntil,
    });
  });

  test("Deve atualizar apenas os campos mencionados de uma licença ambiental existente", async () => {
    const { sut, environmentalLicenseRepository } = makeSut();

    const environmentalLicense = makeEnvironmentalLicense();
    environmentalLicenseRepository.create(environmentalLicense);

    await sut.execute({
      licenseId: environmentalLicense.id,
    });

    const updatedEnvironmentalLicense =
      environmentalLicenseRepository.licenses[0];

    expect(updatedEnvironmentalLicense).toMatchObject({
      licenseNumber: environmentalLicense.licenseNumber,
      environmentalAgency: environmentalLicense.environmentalAgency,
      issuedAt: environmentalLicense.issuedAt,
      validUntil: environmentalLicense.validUntil,
    });
  });

  test("Deve retornar erro caso a licença ambiental não exista", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({ licenseId: "inexistent-license-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
