import { InMemoryCompanyRepository } from "@/infra/database/repositories/in-memory/company";
import { ListAllCompaniesUseCase } from "./list-all-companies";
import { makeCompany } from "@/domain/enterprise/entities/factories/company";

function makeSut() {
  const companyRepository = new InMemoryCompanyRepository();
  const sut = new ListAllCompaniesUseCase(companyRepository);

  return {
    sut,
    companyRepository,
  };
}

describe("ListAllCompaniesUseCase", () => {
  test("Deve listar todas as companies existentes", async () => {
    const { sut, companyRepository } = makeSut();

    for (let i = 0; i < 10; i++) {
      const companyToCreate = makeCompany({
        companyName: `Company ${i + 1}`,
      });
      companyRepository.create(companyToCreate);
    }

    const { companies } = await sut.execute();

    expect(companies).toHaveLength(10);
    expect(companies).toEqual(
      expect.arrayContaining(
        Array.from({ length: 10 }, (_, i) =>
          expect.objectContaining({
            companyName: `Company ${i + 1}`,
          })
        )
      )
    );
  });
});
