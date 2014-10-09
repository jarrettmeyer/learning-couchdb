var accounts        = require('../routes/accounts');
var journalEntries  = require('../routes/journalEntries');
var root            = require('../routes/root');

var RouteConfig = (function () {

  function configureRoutes(app) {
    app.use('/', root);
    app.use('/accounts', accounts);
    app.use('/journal_entries', journalEntries);
  }

  return {
    configureRoutes: configureRoutes
  };

});

module.exports = RouteConfig;
