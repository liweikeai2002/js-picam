const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (request, response) {
  const imagesDirectory = `${process.env.PWD}/public/images/camera-images`;

  response.set('Content-Type', 'application/vnd.api+json');

  fs.readdir(imagesDirectory, function (error, directories) {
    const validDirectories = directories.filter(dir => !dir.startsWith('.'));
    const responseBody = {};
    const includedModels = [];

    responseBody.data = validDirectories.map((directoryName, index) => {
      let fileCount = 0;

      const imageFiles = fs.readdirSync(`${imagesDirectory}/${directoryName}`);

      const imageRelationships = imageFiles.map(function(fileName, index) {
        const id = +index;

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
        id: index,
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
            href: `http://localhost:${process.env.PORT}/time-lapses/${index}/images`,
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
