// app/routes.js

module.exports = function(app) {
  app.get('*', function(req, res) {
    res.sendfile('./public/ui/index.html'); // load our public/index.html file
  });
};
