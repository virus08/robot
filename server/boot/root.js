'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.use('/express-status', function(req, res, next) {
    res.json({ running: true });
  });
  router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });
  router.get('/link/:id', function(req, res) {
    // console.log('Request Type:', req.method);
    res.send(req.params.id);
  });
  server.use(router);
};

