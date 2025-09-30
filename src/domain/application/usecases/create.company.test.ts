import { InMemoryCompanyRepository } from "@/infra/database/repositories/in-memory/company";
import { CreateCompanyUseCase } from "./create-company";
import { faker } from "@faker-js/faker";

function makeSut() {
  const companyRepository = new InMemoryCompanyRepository();
  const sut = new CreateCompanyUseCase(companyRepository);

  return {
    sut,
    companyRepository,
  };
}

describe("CreateCompanyUseCase", () => {
  test("Deve criar uma company corretamente", async () => {
    const { sut, companyRepository } = makeSut();

    const params = {
      companyName: faker.company.name(),
      cnpj: faker.string.uuid(),
      zipCode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      neighborhood: faker.word.sample(),
      street: faker.location.street(),
      complement: undefined,
    };

    sut.execute(params);

    const createdCompany = companyRepository.companies[0];

    expect(createdCompany).toBeDefined();
    expect(createdCompany).toMatchObject({
      companyName: params.companyName,
      cnpj: params.cnpj,
      zipCode: params.zipCode,
      city: params.city,
      state: params.state,
      neighborhood: params.neighborhood,
      street: params.street,
    });
  });
});
