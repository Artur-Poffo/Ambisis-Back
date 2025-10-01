import { Entity } from "../../../core/entities/entity.js";

interface EnvironmentalLicenseProps {
  licenseNumber: string;
  environmentalAgency: string;
  companyId: string;

  issuedAt: Date;
  validUntil: Date;
}

export class EnvironmentalLicense extends Entity<EnvironmentalLicenseProps> {
  get licenseNumber(): string {
    return this.props.licenseNumber;
  }

  get environmentalAgency(): string {
    return this.props.environmentalAgency;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  get issuedAt(): Date {
    return this.props.issuedAt;
  }

  get validUntil(): Date {
    return this.props.validUntil;
  }

  set licenseNumber(value: string) {
    this.props.licenseNumber = value;
  }

  set environmentalAgency(value: string) {
    this.props.environmentalAgency = value;
  }

  set issuedAt(value: Date) {
    this.props.issuedAt = value;
  }

  set validUntil(value: Date) {
    this.props.validUntil = value;
  }

  static create(props: EnvironmentalLicenseProps) {
    return new EnvironmentalLicense(props);
  }

  static restore({ id, ...props }: EnvironmentalLicenseRestoreProps) {
    return new EnvironmentalLicense(props, id);
  }
}

export type EnvironmentalLicenseCreateProps = {
  licenseNumber: string;
  environmentalAgency: string;
  companyId: string;

  issuedAt: Date;
  validUntil: Date;
};

export interface EnvironmentalLicenseRestoreProps
  extends EnvironmentalLicenseCreateProps {
  id: string;
}
