/*
  Right now this file is performing a few responsibilities that, later on, would make sensor
  to break into separate routes.

  The image-configuration route should take care of creating and updating new and existing
  image-configurations and it should also generate new python scripts for each one in the
  bin/picamera directory.

  The actual generation of python scripts should be done from another python script generator
  class that uses blueprints. This will differ from what we're doing below.

  Or, maybe we just have a basic script for each specific type of image/video capturing operation
  and we pass in arguments as we're trying to do currently, below.
 */

const express = require('express');
const PythonShell = require('python-shell');
const fs = require('fs');
const router = express.Router();

const NO_PICAMERA_MESSAGE = 'ImportError: No module named picamera';

const createImagesDirectory = function (path) {
  fs.stat(path, function (error, stat) {
    if (!stat) {
      fs.mkdirSync(path);
      console.logJs('camera images directory created')
    }
  });
};

const buildDateString = function () {
  const currentDate = new Date();

  // Refactor this crap and try using Intl.DateTimeFormat().format()
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  return `${year}.${month}.${day}-${hour}.${minute}.${second}`;
};

router.get('/', function (request, response) {
  // send camera information, like if it's currently in use, etc... ?
  response.send();
});

router.post('/capture-image', function (request, response) {
  const imageConfiguration = request.body['image-configuration'];
  const imagesBasePath = `${process.env.PWD}/public/images/camera-images`;

  // Later on, this will need to go into a directory based on the timelapse name
  // Manually-taken images should go into a directory called "manual".
  // Maybe we need an abstraction called "collection" instead? Manually-taken images
  // go into their own, timelapses get their own, etc...
  const imagesPath = `${imagesBasePath}/${imageConfiguration.name}`;

  createImagesDirectory(imagesPath);

  const imageFileName = `${buildDateString()}.jpeg`;
  const shellOptions = {
    args: [`path=${imagesPath}/${imageFileName}`]
  };

  for (let optionKey of Object.keys(imageConfiguration.options)) {
    shellOptions.args.push(`${optionKey}=${imageConfiguration.options[optionKey]}`);
  }

  console.logPy('starting python script')

  const pythonShell = new PythonShell('bin/picamera/capture-image', shellOptions);

  pythonShell.on('message', function (message) {
    console.logPy(message);
  });

  pythonShell.end(function (error) {
    if (error && error.message.includes(NO_PICAMERA_MESSAGE)) {
      console.logJs('picamera mock-execution, no images captured');
    } else if (error) {
      console.logPy(error);
    } else {
      console.logPy('ending python script');
      console.logJs(`image captured: ${imageFileName}`);
    }

    response.send('capture-image finished');
  });
});

module.exports = router;
