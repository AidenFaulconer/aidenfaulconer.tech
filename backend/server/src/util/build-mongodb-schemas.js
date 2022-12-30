const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const schemasPath = './models';

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/database', {
  useNewUrlParser: true,
});


const buildMongodbSchemas = (app)=> 
// Read the contents of the schemas folder
fs.readdir(schemasPath, (err, files) => {
  if (err) {
    console.error(`Error reading schemas folder: ${err.message}`);
    return;
  }

  // Iterate over the files in the schemas folder
  files.forEach((file) => {
    // Skip any non-JavaScript files
    if (!file.endsWith('.js')) return;

    // Import the schema definition
    const schema = require(path.join(schemasPath, file));

    // Extract the base name of the file (without the .js extension)
    // and use it as the name of the model
    const modelName = file.replace('.js', '');

    // Define the model using the schema definition and the model name
    const Model = mongoose.model(modelName, schema);
  });
});

module.exports = buildMongodbSchemas;