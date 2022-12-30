const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
// import { createHandler } from 'graphql-http/lib/use/express';


const schemasPath = './models';

// Read the contents of the schemas folder
const buildGraphqlSchemas = (app) =>
fs.readdir(schemasPath, (err, files) => {
  if (err) {
    console.error(`Error reading schemas folder: ${err.message}`);
    return;
  }

  // Initialize the GraphQL schema
  const typeDefs = [];
  const resolvers = {};

  // Iterate over the files in the schemas folder
  files.forEach((file) => {
    // Skip any non-JavaScript files
    if (!file.endsWith('.js')) return;

    // Import the schema definition
    const schema = require(path.join(schemasPath, file));

    // Add the type definitions and resolvers from the schema to the GraphQL schema
    typeDefs.push(schema.typeDefs);
    Object.assign(resolvers, schema.resolvers);
  });

  // Use makeExecutableSchema to combine the type definitions and resolvers into a single GraphQL schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
});

//add like this
// app.all('/graphql', createHandler({ schema }));

module.exports = buildGraphqlSchemas;
