/*
  Catch Errors
*/

// Async/await error catcher
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  }
}