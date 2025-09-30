import type { UseCaseError } from "../usecase-error.js";

export class ResourceAlreadyExistError extends Error implements UseCaseError {
  constructor(message: string = "Resource already exist") {
    super(message);
  }
}
