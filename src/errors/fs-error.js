const { CustomError } = require('./custom-error');

class FsError extends CustomError {
  statusCode = 500;
  reason = 'Internal server error. Please contact support.';

  constructor() {
    // the super message is just for logging porposes
    super('Error reading/writing file');

    // only because we are extendind a built in class
    Object.setPrototypeOf(this, FsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

module.exports = { FsError };
