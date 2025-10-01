export interface PrismaEnvironmentalLicenseDto {
  id: string;

  license_number: string;
  environmental_agency: string;
  company_id: string;

  issued_at: Date;
  valid_until: Date;

  created_at: Date;
  updated_at: Date;
}
