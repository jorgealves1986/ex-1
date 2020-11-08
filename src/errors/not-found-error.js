const { CustomError } = require('./custom-error');

class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Not found';

  constructor() {
    // the super message is just for logging porposes
    super('Not found');

    // only because we are extendind a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

module.exports = { NotFoundError };
