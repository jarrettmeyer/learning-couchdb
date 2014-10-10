var CouchDB = require('../../../lib/data/CouchDB');

describe('CouchDB', function () {

  var db;

  beforeEach(function () {
    db = new CouchDB({
      url: 'http://localhost:5984',
      database: 'test'
    });
  });

  it('should have a valid constructor', function () {
    expect(CouchDB).toBeDefined();
    expect(typeof CouchDB).toEqual('function');
  });

  it('has a connection URL attribute', function () {
    expect(db.url.hostname).toEqual('localhost');
    expect(db.url.port).toEqual('5984');
  });

  it('has a database attribute', function () {
    expect(db.database).toEqual('test');
  });

  describe('create', function () {

    it('can create a new document', function (done) {
      db.createDB(function (error, result) {
        if (error) {
          done(error);
        }
        db.create({ _id: 'test', message: 'testing document creation'}, function (error, result) {
          expect(result.ok).toEqual(true);
          expect(result.id).toEqual('test');
          db.destroyDB(function (error, result) {
            done(error);
          })
        });
      });
    });

  });

  describe('createDB', function () {

    it('can create a new database', function (done) {
      db.createDB(function (error, result) {
        if (error) {
          done(error);
        } else {
          expect(result.ok).toEqual(true);
          db.destroyDB(function (error, result) {
            if (error) {
              done(error);
            } else {
              done();
            }
          })
        }
      });
    });

  });

  describe('destroyDB', function () {

    it('can delete a database', function (done) {
      db.createDB(function (error, result) {
        if (error) {
          done(error);
        } else {
          db.destroyDB(function (error, result) {
            if (error) {
              done(error);
            } else {
              expect(result.ok).toEqual(true);
              done();
            }
          });
        }
      });
    });

  });

  describe('exists', function () {

    it('returns false when the database does not exist', function (done) {
      db.database = 'this-is-junk-' + Math.random().toString().replace('.', '');
      db.exists(function (result) {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('returns true when the database does exist', function (done) {
      db.createDB(function (error, result) {
        if (error) {
          done(error);
        } else {
          db.exists(function (result) {
            expect(result).toBeTruthy();
            db.destroyDB(function (error, result) {
              if (error) {
                done(error);
              } else {
                done();
              }
            });
          });
        }
      });
    });

  });

  describe('get', function () {

    it('can return an existing document', function (done) {
      db.createDB(function (error, result) {
        if (error) {
          done(error);
        }
        db.create({ _id: 'test', message: 'testing get existing document' }, function (error, result) {
          if (error) {
            done(error);
          }
          db.get('test', function (error, result) {
            if (error) {
              done(error);
            }
            expect(result._id).toEqual('test');
            expect(result.message).toEqual('testing get existing document');
            expect(result._rev).toMatch(/^1\-*/);
            db.destroyDB(function (error, result) {
              if (error) {
                done(error);
              } else {
                done();
              }
            });
          });
        });
      });
    });

    it('returns an error is a document does not exist', function (done) {
      db.createDB(function (error, result) {
        db.get('i-do-not-exist', function (error, result) {
          expect(error.error).toEqual('not_found');
          db.destroyDB(function (error, result) {
            done(error);
          });
        });
      });
    });

  });

});
