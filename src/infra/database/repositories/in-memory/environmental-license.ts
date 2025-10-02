import type { EnvironmentalLicenseRepository } from "@/domain/application/repositories/environmental-license";
import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

export class InMemoryEnvironmentalLicenseRepository
  implements EnvironmentalLicenseRepository
{
  licenses: EnvironmentalLicense[] = [];

  async findById(id: string): Promise<EnvironmentalLicense | null> {
    const license = this.licenses.find((license) => license.id === id);
    if (!license) return null;

    return license;
  }

  async findAll(): Promise<EnvironmentalLicense[]> {
    return this.licenses;
  }

  async create(environmentalLicense: EnvironmentalLicense): Promise<void> {
    this.licenses.push(environmentalLicense);
  }

  async update(environmentalLicense: EnvironmentalLicense): Promise<void> {
    const licenseToUpdate = this.licenses.findIndex(
      (license) => license.id === environmentalLicense.id
    );
    if (licenseToUpdate === -1) return;

    this.licenses[licenseToUpdate] = environmentalLicense;
  }

  async delete(environmentalLicense: EnvironmentalLicense): Promise<void> {
    const licenseToDelete = this.licenses.findIndex(
      (license) => license.id === environmentalLicense.id
    );
    if (licenseToDelete === -1) return;

    this.licenses.splice(licenseToDelete, 1);
  }
}
