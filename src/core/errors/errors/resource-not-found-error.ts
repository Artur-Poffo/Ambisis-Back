import type { UseCaseError } from "../usecase-error.js";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(message: string = "Resource not found") {
    super(message);
  }
}
