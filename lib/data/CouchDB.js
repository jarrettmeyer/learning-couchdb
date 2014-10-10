var http = require('http');
var url = require('url');

var CouchDB = (function () {

  function CouchDB(options) {
    options = options || {};
    this.url = url.parse(options.url || 'http://localhost:5984');
    this.database = options.database || 'test';
  }

  CouchDB.prototype.create = function (doc, callback) {
    return request({
      db: this,
      method: 'POST',
      data: doc,
      success: function (result) {
        if (result.error) {
          callback(result, null);
        } else {
          callback(null, result);
        }
      },
      error: function (error) {
        callback(error, null);
      }
    });
  };

  CouchDB.prototype.createDB = function (callback) {
    return request({
      db: this,
      method: 'PUT',
      success: function (result) {
        //console.log("Successfully created database '" + this.database + "'.");
        callback(null, result);
      }.bind(this),
      error: function (error) {
        callback(error, null);
      }
    });
  };

  CouchDB.prototype.destroy = function (id, callback) {
    return request({

    });
  };

  CouchDB.prototype.destroyDB = function (callback) {
    return request({
      db: this,
      method: 'DELETE',
      success: function (result) {
        //console.log("Successfully deleted database '" + this.database + "'.");
        callback(null, result);
      }.bind(this),
      error: function (error) {
        callback(error, null);
      }
    });
  };

  CouchDB.prototype.exists = function (callback) {
    return request({
      db: this,
      method: 'GET',
      success: function (result) {
        if (result.error) {
          callback(false);
        } else {
          callback(result);
        }
      },
      error: function (error) {
        callback(false);
      }
    });
  };

  CouchDB.prototype.get = function (id, callback) {
    return request({
      db: this,
      method: 'GET',
      path: '/' + id,
      success: function (result) {
        if (result.error) {
          callback(result, null);
        } else {
          callback(null, result);
        }
      },
      error: function (error) {
        callback(error, null);
      }
    })
  };

  function request(args) {
    var opts = {
      hostname: args.db.url.hostname,
      port: args.db.url.port,
      path: '/' + args.db.database + (args.path || ''),
      method: (args.method || 'GET'),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };
    // console.log(opts);
    var result = '';
    var req = http.request(opts, function (res) {
      res.on('data', function (chunk) {
        result += chunk;
      });
      res.on('end', function () {
        args.success(JSON.parse(result));
      })
    });
    req.on('error', function (error) {
      console.error(error);
      args.error(error);
    });
    if (args.data) {
      req.write(JSON.stringify(args.data));
    }
    req.end();
    return req;
  }

  return CouchDB;

})();

module.exports = CouchDB;
