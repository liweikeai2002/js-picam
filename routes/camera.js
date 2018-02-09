const express = require('express');
const PythonShell = require('python-shell');

const router = express.Router();

router.get('/capture-image', function(request, response) {
  PythonShell.run('lib/python/scripts/capture-image.py', function (err) {
    if (err) { throw err };

    console.log('finished');
  });
});

module.exports = router;
