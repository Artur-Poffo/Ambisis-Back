import { Entity } from "../../../core/entities/entity.js";

// Para adicionar validações em campos como CEP e CNPJ, seria ideal criar um Value Object (VO)
// que encapsulasse toda a lógica e complexidade dessas validações, mantendo o código mais limpo e organizado.
// Mesma coisa pra outra entidade...
interface CompanyProps {
  companyName: string;
  cnpj: string;

  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  complement: string | undefined;
}

export class Company extends Entity<CompanyProps> {
  get companyName(): string {
    return this.props.companyName;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get street(): string {
    return this.props.street;
  }

  get complement(): string | undefined {
    return this.props.complement;
  }

  set companyName(value: string) {
    this.props.companyName = value;
  }

  set cnpj(value: string) {
    this.props.cnpj = value;
  }

  set zipCode(value: string) {
    this.props.zipCode = value;
  }

  set city(value: string) {
    this.props.city = value;
  }

  set state(value: string) {
    this.props.state = value;
  }

  set neighborhood(value: string) {
    this.props.neighborhood = value;
  }

  set street(value: string) {
    this.props.street = value;
  }

  set complement(value: string | undefined) {
    this.props.complement = value;
  }

  static create(props: CompanyProps) {
    return new Company(props);
  }

  static restore({ id, ...props }: CompanyRestoreProps) {
    return new Company(props, id);
  }
}

export type CompanyCreateProps = {
  companyName: string;
  cnpj: string;

  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  complement: string | undefined;
};

export interface CompanyRestoreProps extends CompanyCreateProps {
  id: string;
}
