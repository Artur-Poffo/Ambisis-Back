import type { UseCaseError } from "../usecase-error.js";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not allowed");
  }
}
