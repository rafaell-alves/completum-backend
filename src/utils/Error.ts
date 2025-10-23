import { HttpStatusCode } from './HttpStatusCode';

class BaseError extends Error {
  public name: string;
  public is_operacional: boolean;
  public code: number;
  constructor(name: string, code, description, is_operacional) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.code = code;
    this.is_operacional = is_operacional;
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error',
  ) {
    super(name, httpCode, isOperational, description);
  }
}
