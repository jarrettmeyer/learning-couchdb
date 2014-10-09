var ErrorHandler = (function () {

  function catch404(app) {
    app.use(function (request, response, next) {
      var error = new Error('Not Found');
      error.status = 404;
      next(error);
    });
  }

  function handleError(app) {
    catch404(app);
    resolveError(app);
  }

  function isDevelopment(app) {
    return app.get('env') === 'development';
  }

  function resolveError(app) {
    app.use(function (error, request, response, next) {

      var innerError = isDevelopment(app) ? error : {};

      response.status(error.status || 500);
      response.render('error', {
        message: error.message,
        error: innerError
      });
    });
  }

  return {
    handleError: handleError
  };

});

module.exports = ErrorHandler;


// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
