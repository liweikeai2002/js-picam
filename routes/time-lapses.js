const express = require('express');
const router = express.Router();
const fs = require('fs');
const image = require('js-picam-domain').Image;

const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mongoUrl = require('../config/database').test;

const TimeLapseModel = require('../models/time-lapse');

router.post('/', function(request, response) {
  mongoose.connect(mongoUrl);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    const data = request.body.data;

    const derp = new TimeLapseModel(data.attributes);

    derp.save(function(error) {
      debugger;
    });
  });

});


router.get('/', function(request, response) {
  const imagesDirectory = `${process.env.PWD}/public/images/camera-images`;

  mongo.connect(mongoUrl, (err, client) => {

  })

  response.set('Content-Type', 'application/vnd.api+json');

  fs.readdir(imagesDirectory, function (error, directories) {
    const validDirectories = directories.filter(dir => !dir.startsWith('.'));
    const responseBody = {};
    const includedModels = [];

    responseBody.data = validDirectories.map((directoryName, directoryIndex) => {
      let fileCount = 0;

      const imageFiles = fs.readdirSync(`${imagesDirectory}/${directoryName}`).filter(dir => !dir.startsWith('.'));

      const imageRelationships = imageFiles.map(function(fileName, imageIndex) {
        const id = `${directoryIndex}_${imageIndex}`;

        includedModels.push({
          id,
          type: 'images',
          attributes: {
            name: fileName,
            href: `http://localhost:${process.env.PORT}/images/camera-images/${directoryName}/${fileName}`
          }
        });

        return { id, type: 'image' };
      });

      return {
        type: 'time-lapses',
        id: directoryIndex,
        attributes: {
          name: directoryName
        },
        relationships: {
          images: {
            data: imageRelationships
          }
        },
        links: {
          images: {
            href: `http://localhost:${process.env.PORT}/time-lapses/${directoryIndex}/images`,
            meta: {
              count: imageFiles.length
            }
          }
        }
      };
    });

    responseBody.included = includedModels;

    response.send(responseBody);

    // for each directory, create a time-lapse POJO
    // then create another loop and loop through all of the files
    //
  });
});

module.exports = router;
