export class ApiError extends Error {
  constructor(statusCode = "500", message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
