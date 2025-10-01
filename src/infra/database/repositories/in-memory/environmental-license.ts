import type { EnvironmentalLicenseRepository } from "@/domain/application/repositories/environmental-license";
import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

export class InMemoryEnvironmentalLicense
  implements EnvironmentalLicenseRepository
{
  environmentalLicenses: EnvironmentalLicense[] = [];

  async findById(id: string): Promise<EnvironmentalLicense | null> {
    const license = this.environmentalLicenses.find(
      (license) => license.id === id
    );
    if (!license) return null;

    return license;
  }

  async findAllFromCompany(companyId: string): Promise<EnvironmentalLicense[]> {
    return this.environmentalLicenses.filter(
      (environmentalLicense) => environmentalLicense.companyId === companyId
    );
  }

  async create(environmentalLicense: EnvironmentalLicense): Promise<void> {
    this.environmentalLicenses.push(environmentalLicense);
  }

  async update(environmentalLicense: EnvironmentalLicense): Promise<void> {
    const licenseToUpdate = this.environmentalLicenses.findIndex(
      (license) => license.id === environmentalLicense.id
    );
    if (licenseToUpdate === -1) return;

    this.environmentalLicenses[licenseToUpdate] = environmentalLicense;
  }

  async delete(environmentalLicense: EnvironmentalLicense): Promise<void> {
    const licenseToDelete = this.environmentalLicenses.findIndex(
      (license) => license.id === environmentalLicense.id
    );
    if (licenseToDelete === -1) return;

    this.environmentalLicenses.splice(licenseToDelete, 1);
  }
}
