const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Connect to the database
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
});

const schemasPath = './models';

const buildPostgresSchemas = (app)=>
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
    const Model = sequelize.define(modelName, schema);

    // Sync the model with the database
    Model.sync({ force: true }).then(() => {
      console.log(`Model ${modelName} synced with database`);
    });
  });
});

module.exports = buildPostgresSchemas;