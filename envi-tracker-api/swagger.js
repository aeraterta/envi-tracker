const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'API documentation for your Express.js application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        // Define other security schemes as needed
      },
    },
  },
  // Add the security scheme to the components section
  // components: {
  //   securitySchemes: {
  //     bearerAuth: {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //     },
  //     // Define other security schemes as needed
  //   },
  // },
  // Path to the API docs
  apis: ['./src/routes/*.js'], // Replace with your actual route file path(s)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
