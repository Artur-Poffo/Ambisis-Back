import type { EnvironmentalLicenseRepository } from "@/domain/application/repositories/environmental-license";
import type { EnvironmentalLicense } from "@/domain/enterprise/entities/environmental-license";

import { PrismaEnvironmentalLicenseMapper } from "./dtos/mappers/environmental-license";
import { prisma } from "./prisma-client";

export class PrismaEnvironmentalLicenseRepository
  implements EnvironmentalLicenseRepository
{
  async findById(id: string): Promise<EnvironmentalLicense | null> {
    const license = await prisma.environmentalLicense.findUnique({
      where: {
        id,
      },
    });
    if (!license) return null;

    return PrismaEnvironmentalLicenseMapper.toEntity(license);
  }

  async findAllFromCompany(companyId: string): Promise<EnvironmentalLicense[]> {
    const licenses = await prisma.environmentalLicense.findMany({
      where: {
        company_id: companyId,
      },
    });

    return licenses.map((license) =>
      PrismaEnvironmentalLicenseMapper.toEntity(license)
    );
  }

  async create(environmentalLicense: EnvironmentalLicense): Promise<void> {
    await prisma.environmentalLicense.create({
      data: {
        id: environmentalLicense.id,

        license_number: environmentalLicense.licenseNumber,
        environmental_agency: environmentalLicense.environmentalAgency,
        company_id: environmentalLicense.companyId,

        issued_at: environmentalLicense.issuedAt,
        valid_until: environmentalLicense.validUntil,

        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async update(environmentalLicense: EnvironmentalLicense): Promise<void> {
    await prisma.environmentalLicense.update({
      where: {
        id: environmentalLicense.id,
      },
      data: {
        license_number: environmentalLicense.licenseNumber,
        environmental_agency: environmentalLicense.environmentalAgency,

        issued_at: environmentalLicense.issuedAt,
        valid_until: environmentalLicense.validUntil,

        updated_at: new Date(),
      },
    });
  }

  async delete(environmentalLicense: EnvironmentalLicense): Promise<void> {
    await prisma.environmentalLicense.delete({
      where: {
        id: environmentalLicense.id,
      },
    });
  }
}
