const path = require('path');
const fs = require('fs');

//generate controllers/routes 
const controllersPath = './src/controllers';

// Read the contents of the controllers folder
const buildControllers = (app) =>
  fs.readdir(controllersPath, (err, files) => {
    if (err) {
      console.error(`Error reading controllers folder: ${err.message}`);
      return;
    }

    // Iterate over the files in the controllers folder
    files.forEach((file) => {
      // Skip any non-JavaScript files
      if (!file.endsWith('.js')) return;

      // Import the controller
      const controller = require(`../controllers/${file}`);

      // Extract the base name of the file (without the .js extension)
      // and use it as the path for the controller's routes
      const baseName = file.replace('.js', '');
      app.use(`/api/${baseName}`, controller);
      ///call as: api/basename/routermethodname

      // console.info(`TEST ${controller}`)
      // if (process.env.NODE_ENV !== 'development') {
      console.log(`Generated api: /api/${baseName}`)
      // }
    });
  });

module.exports = buildControllers;