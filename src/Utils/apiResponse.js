export class ApiResponse {
  constructor(status, message, data = {}, success = true, errors = []) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = success;
    this.errors = errors;
  }

  static json(status, message, data, success = true, errors) {
    const response = new ApiResponse(
      status,
      message,
      data,
      (success = true),
      errors
    );
    return res.status(status).json(response);
  }
}
