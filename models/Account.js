var uuid = require('node-uuid');

var Account = (function () {

  function Account(args) {
    args = args || {};
    this._id = args._id || uuid.v4();
    this.description = args.description || "";
    this.isActive = args.isActive !== false;
    this.name = args.name || "";
    this.openingBalance = args.openingBalance || 0.0;
    this.adjustments = 0.00;
    this.currentBalance = this.openingBalance;
  }

  return Account;

})();

module.exports = Account;
