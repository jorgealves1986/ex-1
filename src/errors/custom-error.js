class CustomError extends Error {
  statusCode;
  reason;

  // the message is just for logging porposes
  constructor(message, statusCode) {
    super(message);

    // only because we are extendind a built in class
    Object.setPrototypeOf(this, CustomError.prototype);

    this.reason = message;
    this.statusCode = statusCode;
  }

  // should return an array of objects and
  // each object should have, at least, a message field
  // containing the error message...
  serializeErrors() {
    return [{ message: this.reason }];
  }
}

module.exports = { CustomError };
