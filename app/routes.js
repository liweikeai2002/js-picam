// app/routes.js
const PythonShell = require('python-shell');

module.exports = function(app) {
  app.get('/', function(request, response) {
    request.sendFile('./public/index.html'); // load our public/index.html file
  });

  app.get('/capture-image', function(request, response) {
    PythonShell.run('lib/python/scripts/capture-image.py', function (err) {
      if (err) { throw err };

      console.log('finished');
    });

  });
};
