const crypto = require('crypto');

class Session {
  constructor () {
    this.id = crypto.randomBytes(8).toString('hex');
  }
}

module.exports = Session;
