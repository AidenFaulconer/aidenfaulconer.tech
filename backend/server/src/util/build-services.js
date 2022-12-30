const generateSwaggerApi = (app)=>{
    const expressSwagger = require('express-swagger-generator')(app);
    let options = {
        swaggerDefinition: {
            info: {
                description: 'Backend for business educated',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: `${process.env.DOMAIN_NAME}:${process.env.SERVER_PORT}`,
            basePath: '/v1',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['../controllers/**/*.js'] //Path to the API handle folder
    }; 
    expressSwagger(options) 
}

module.exports = generateSwaggerApi;