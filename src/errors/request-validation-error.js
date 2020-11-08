const { CustomError } = require('./custom-error');

class RequestValidationError extends CustomError {
  statusCode = 400;
  errors;

  // errors is an array of errors
  constructor(errors) {
    // the super message is just for logging porposes
    super('Invalid request parameters');

    // only because we are extendind a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);

    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

module.exports = { RequestValidationError };
