const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();


const swaggerOption = {
  definition: {
    info: {
      title: 'Vehicle Task',
      version: '1.0.0',
      description: "It's a Secret"
    },
    securityDefinitions: {
      BearerAuthentication: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    },
    requestInterceptor: (request) => {
      request.headers.Origin = '*'
      return request
    },
    host: `${process.env.BASE_URL}`,
    schemes: ['https', 'http']
  },
  apis: [
    'server.js',
    './routes/api/v1/*/*.routes.js',
    './routes/admin/*.routes.js'
  ],
  basePath: '/v1'
}

const swaggerDocs = swaggerJsDoc(swaggerOption)

module.exports = swaggerDocs;
