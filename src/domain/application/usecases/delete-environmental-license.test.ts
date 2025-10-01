import { InMemoryEnvironmentalLicenseRepository } from "@/infra/database/repositories/in-memory/environmental-license";
import { makeEnvironmentalLicense } from "@/domain/enterprise/entities/factories/environmental-license";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { DeleteEnvironmentalLicense } from "./delete-environmental-license";

function makeSut() {
  const environmentalLicenseRepository =
    new InMemoryEnvironmentalLicenseRepository();
  const sut = new DeleteEnvironmentalLicense(environmentalLicenseRepository);

  return {
    sut,
    environmentalLicenseRepository,
  };
}

describe("DeleteEnvironmentalLicense", () => {
  test("Deve deletar uma licença ambiental existente", async () => {
    const { sut, environmentalLicenseRepository } = makeSut();

    const environmentalLicense = makeEnvironmentalLicense();
    environmentalLicenseRepository.create(environmentalLicense);

    await sut.execute({
      licenseId: environmentalLicense.id,
    });

    expect(environmentalLicenseRepository.licenses).toHaveLength(0);
  });

  test("Deve retornar erro caso a licença ambiental não exista", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({ licenseId: "inexistent-license-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
