// Helper functions

// Dump -- "console.log" our data into the front end
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Label maker
exports.mapWith = (choices, fn) => choices.map(fn);

// Get IP address
exports.getIP = (req) => {
  let forwardedFor = req.header('X-Forwarded-For');
  if (forwardedFor) {
    return forwardedFor.split(',').shift();
  }
  else {
    return req.connection.remoteAddress;
  }
}