import { InMemoryEnvironmentalLicenseRepository } from "@/infra/database/repositories/in-memory/environmental-license";
import { ListAllEnvironmentalLicensesFromCompanyUseCase } from "./list-all-environmental-license-from-company";
import { makeCompany } from "@/domain/enterprise/entities/factories/company";
import { makeEnvironmentalLicense } from "@/domain/enterprise/entities/factories/environmental-license";

function makeSut() {
  const environmentalLicenseRepository =
    new InMemoryEnvironmentalLicenseRepository();
  const sut = new ListAllEnvironmentalLicensesFromCompanyUseCase(
    environmentalLicenseRepository
  );

  return {
    sut,
    environmentalLicenseRepository,
  };
}

describe("ListAllEnvironmentalLicensesFromCompanyUseCase", () => {
  test("Deve listar todas as licenças ambientais de uma empresa específica", async () => {
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
