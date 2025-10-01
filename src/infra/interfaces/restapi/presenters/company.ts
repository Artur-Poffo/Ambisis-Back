import type { Company } from "@/domain/enterprise/entities/company";

export class RestApiCompanyPresenter {
  static toRestApiResponse(company: Company) {
    return {
      id: company.id,
      companyName: company.companyName,
      cnpj: company.cnpj,
      zipCode: company.zipCode,
      city: company.city,
      state: company.state,
      neighborhood: company.neighborhood,
      street: company.street,
      complement: company.complement || undefined,
    };
  }
}
