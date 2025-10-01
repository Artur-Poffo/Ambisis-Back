export interface PrismaCompanyDto {
  id: string;
  company_name: string;
  cnpj: string;
  zip_code: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  complement: string | null;
  created_at: Date;
  updated_at: Date;
}
