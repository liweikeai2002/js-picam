// app/routes.js

module.exports = function(app) {
  app.get('*', function(req, res) {
    res.sendFile('./public/ui/index.html'); // load our public/index.html file
  });
};
