var Account = require('../../models/Account');

describe("Account", function () {

  it('assigns a new id', function () {
    var account = new Account();
    expect(account._id.length).toEqual(36);
  })

  it('can create a new instance', function () {
    var account = new Account();
    expect(account).toBeDefined();
  });

  it('can set a name in the constructor', function () {
    var account = new Account({ name: 'Sales' });
    expect(account.name).toEqual('Sales');
  })

  it('can set an opening balance in the constructor', function () {
    var account = new Account({ openingBalance: 1234.56 });
    expect(account.openingBalance).toEqual(1234.56);
  });

  it('has values for adjustments and current balance', function () {
    var account = new Account({ openingBalance: 100.00 });
    expect(account.adjustments).toEqual(0.00);
    expect(account.currentBalance).toEqual(100.00);
  })

});
