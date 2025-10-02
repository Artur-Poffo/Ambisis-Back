import { InMemoryEnvironmentalLicenseRepository } from "@/infra/database/repositories/in-memory/environmental-license";
import { ListAllEnvironmentalLicensesUseCase } from "./list-all-environmental-licenses";
import { makeEnvironmentalLicense } from "@/domain/enterprise/entities/factories/environmental-license";
import { makeCompany } from "@/domain/enterprise/entities/factories/company";

function makeSut() {
  const environmentalLicenseRepository =
    new InMemoryEnvironmentalLicenseRepository();
  const sut = new ListAllEnvironmentalLicensesUseCase(
    environmentalLicenseRepository
  );

  return {
    sut,
    environmentalLicenseRepository,
  };
}

describe("ListAllEnvironmentalLicensesUseCase", () => {
  test("Deve listar todas as licenças ambientais existentes", async () => {
    const { sut, environmentalLicenseRepository } = makeSut();

    for (let i = 0; i < 10; i++) {
      const environmentalLicenseToCreate = makeEnvironmentalLicense({
        licenseNumber: `License ${i + 1}`,
      });
      environmentalLicenseRepository.create(environmentalLicenseToCreate);
    }

    const { environmentalLicenses } = await sut.execute({});

    expect(environmentalLicenses).toHaveLength(10);
    expect(environmentalLicenses).toEqual(
      expect.arrayContaining(
        Array.from({ length: 10 }, (_, i) =>
          expect.objectContaining({
            licenseNumber: `License ${i + 1}`,
          })
        )
      )
    );
  });

  test("Deve listar todas as licenças ambientais de uma empresa específica caso receba o filtro existentes", async () => {
    const { sut, environmentalLicenseRepository } = makeSut();

    const company = makeCompany();
    const companyId = company.id;

    for (let i = 0; i < 5; i++) {
      const environmentalLicenseToCreateForThisCompany =
        makeEnvironmentalLicense({
          companyId,
        });
      environmentalLicenseRepository.create(
        environmentalLicenseToCreateForThisCompany
      );
    }

    for (let i = 0; i < 5; i++) {
      const environmentalLicenseToCreateForOtherCompany =
        makeEnvironmentalLicense({
          companyId: "other-company-id",
        });
      environmentalLicenseRepository.create(
        environmentalLicenseToCreateForOtherCompany
      );
    }

    const { environmentalLicenses } = await sut.execute({ companyId });

    expect(environmentalLicenses).toHaveLength(5);
    expect(environmentalLicenses).toEqual(
      expect.arrayContaining(
        Array.from({ length: 5 }, () =>
          expect.objectContaining({
            companyId,
          })
        )
      )
    );
  });
});
