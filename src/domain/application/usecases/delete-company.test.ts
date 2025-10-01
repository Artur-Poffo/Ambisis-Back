import { InMemoryCompanyRepository } from "@/infra/database/repositories/in-memory/company";
import { makeCompany } from "@/domain/enterprise/entities/factories/company";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { DeleteCompany } from "./delete-company";

function makeSut() {
  const companyRepository = new InMemoryCompanyRepository();
  const sut = new DeleteCompany(companyRepository);

  return {
    sut,
    companyRepository,
  };
}

describe("DeleteCompany", () => {
  test("Deve deletar uma company existente", async () => {
    const { sut, companyRepository } = makeSut();

    const company = makeCompany();
    companyRepository.create(company);

    await sut.execute({
      companyId: company.id,
    });

    expect(companyRepository.companies).toHaveLength(0);
  });

  test("Deve retornar erro caso a company não exista", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({ companyId: "inexistent-company-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
