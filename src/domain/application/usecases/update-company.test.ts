import { InMemoryCompanyRepository } from "@/infra/database/repositories/in-memory/company";
import { makeCompany } from "@/domain/enterprise/entities/factories/company";
import { UpdateCompanyUseCase } from "./update-company";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

function makeSut() {
  const companyRepository = new InMemoryCompanyRepository();
  const sut = new UpdateCompanyUseCase(companyRepository);

  return {
    sut,
    companyRepository,
  };
}

describe("UpdateCompanyUseCase", () => {
  test("Deve atualizar uma company existente", async () => {
    const { sut, companyRepository } = makeSut();

    const company = makeCompany();
    companyRepository.create(company);

    // Lembrando que fiz propositalmente esses campos não terem validação, pela simplicidade
    // Mas em projetos serias VOs, classes com validações próprias e nesse casso esse teste seria barrado quando eu tentasse definir CNPJ ou CEP pra um valor nada haver
    const params = {
      companyId: company.id,
      companyName: "Updated Company Name",
      cnpj: "Updated CNPJ",
      zipCode: "Updated ZipCode",
      city: "Updated City",
      state: "Updated State",
      neighborhood: "Updated Neighborhood",
      street: "Updated Street",
      complement: "Updated Complement",
    };

    await sut.execute(params);

    const updatedCompany = companyRepository.companies[0];

    expect(updatedCompany).toMatchObject({
      companyName: params.companyName,
      cnpj: params.cnpj,
      zipCode: params.zipCode,
      city: params.city,
      state: params.state,
      neighborhood: params.neighborhood,
      street: params.street,
      complement: params.complement,
    });
  });

  test("Deve atualizar apenas os campos mencionados de uma company existente", async () => {
    const { sut, companyRepository } = makeSut();

    const company = makeCompany();
    companyRepository.create(company);

    await sut.execute({
      companyId: company.id,
    });

    const updatedCompany = companyRepository.companies[0];

    expect(updatedCompany).toMatchObject({
      companyName: company.companyName,
      cnpj: company.cnpj,
      zipCode: company.zipCode,
      city: company.city,
      state: company.state,
      neighborhood: company.neighborhood,
      street: company.street,
      complement: company.complement,
    });
  });

  test("Deve retornar erro caso a company não exista", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({ companyId: "inexistent-company-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
