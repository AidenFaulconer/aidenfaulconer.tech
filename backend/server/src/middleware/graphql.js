const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');


// Create a GraphQL endpoint using express-graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true, // Enable the GraphiQL tool for testing the API
  })
);