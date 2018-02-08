var express = require('express');
var router = express.Router();

var PythonShell = require('python-shell');

router.get('/capture-image', function(request, response) {
  PythonShell.run('lib/python/scripts/capture-image.py', function (err) {
    if (err) { throw err };

    console.log('finished');
  });
});

module.exports = router;
