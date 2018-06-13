const express = require('express');
const router = express.Router();
const statuses = require('http-status-codes');

const fs = require('fs');
const image = require('js-picam-domain').Image;

const TimeLapseModel = require('../models/time-lapse/model');
const timeLapseSerializer = require('../models/time-lapse/serializer');

router.post('/', async function(request, response) {

  // TODO: make this the default response type through some middleware, yo.
  response.set('Content-Type', 'application/vnd.api+json');

  const data = request.body.data.attributes;

  if (!data.name) {
    return response.status(statuses.UNPROCESSABLE_ENTITY).send({
      errors: [
        {
          status: statuses.UNPROCESSABLE_ENTITY,
          title: statuses.getStatusText(statuses.UNPROCESSABLE_ENTITY),
          detail: 'A time-lapse name is required'
        }
      ]
    });
  }

  const existingRecords = await TimeLapseModel.find({ 'name': data.name });

  if (existingRecords.length) {
    return response.status(statuses.CONFLICT).send({
      errors: [
        {
          status: statuses.CONFLICT,
          title: statuses.getStatusText(statuses.CONFLICT),
          detail: 'A time-lase with the same name was found. Names must be unique'
        }
      ]
    });
  }

  const timeLapse = new TimeLapseModel(data);

  timeLapse.save();

  return response.status(statuses.CREATED).send(
    timeLapseSerializer.serialize(timeLapse)
  );
});

router.get('/', async function() {
  const timeLapses = await TimeLapseModel.find();

  debugger;
});

router.get('/ - deprecated', function(request, response) {
  const imagesDirectory = `${process.env.PWD}/public/images/camera-images`;

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
