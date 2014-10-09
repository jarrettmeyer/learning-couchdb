var JournalEntry = require('../../models/JournalEntry');

describe('JournalEntry', function () {

  it('assigns a new id', function () {
    var je = new JournalEntry();
    expect(je._id.length).toEqual(36);
  })

  it('can create a new instance', function () {
    var je = new JournalEntry();
    expect(je).toBeDefined();
  });

  it('is not valid when the debits and credits are equal', function () {
    var je = new JournalEntry();
    je.debits.push({ name: 'Accounts Receivable', amount: 100.00 });
    je.credits.push({ name: 'Gross Sales', amount: 99.99 });
    expect(je.isValid()).toBeFalsy();
    expect(je.errors[0]).toEqual('Debits and Credits do not balance! Dr: 100, Cr: 99.99');
  });

  it('is valid when the debits and credits are equal', function () {
    var je = new JournalEntry();
    je.debits.push({ name: 'Accounts Receivable', amount: 100.00 });
    je.credits.push({ name: 'Gross Sales', amount: 100.00 });
    expect(je.isValid()).toBeTruthy();
  });

});
