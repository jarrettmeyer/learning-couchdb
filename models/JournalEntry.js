var uuid = require('node-uuid');

module.exports = (function () {

  function JournalEntry(args) {
    args = args || {};
    this._id = args._id || uuid.v1();
    this.timestamp = args.timestamp;
    this.credits = args.credits || [];
    this.debits = args.debits || [];
    this.errors = [];
    this.isPosted = false;
  }

  JournalEntry.prototype.isValid = function () {
    ensureAtLeastOneDebit(this);
    ensureAtLeastOneCredit(this);
    ensureSumOfDebitsAndCreditsIsEqual(this);
    return this.errors.length === 0;
  }

  function ensureAtLeastOneCredit(je) {
    if (je.credits.length > 0) {
      return true;
    } else {
      je.errors.push("A journal entry must have at least one credit.");
      return false;
    }
  }

  function ensureAtLeastOneDebit(je) {
    if (je.debits.length > 0) {
      return true;
    } else {
      je.errors.push("A journal entry must have at least one debit.");
      return false;
    }
  }

  function ensureSumOfDebitsAndCreditsIsEqual(je) {
    var sumDebits = je.debits.reduce(sumAmounts, 0.0);
    var sumCredits = je.credits.reduce(sumAmounts, 0.0);
    if (sumDebits === sumCredits) {
      return true;
    } else {
      je.errors.push('Debits and Credits do not balance! Dr: ' + sumDebits + ', Cr: ' + sumCredits);
      return false;
    }
  }

  function sumAmounts(previous, current) {
    var amount = current.amount || 0.0;
    return previous + amount;
  }

  return JournalEntry;

})();
