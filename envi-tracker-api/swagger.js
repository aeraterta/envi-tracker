const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Envi Tracker API',
      version: '1.0.0',
      description: 'API documentation for Envi Tracker API',
    },
      components: {
        securitySchemes: {
          oauth2: {
            type: 'oauth2',
            flows: {
              password: {
                tokenUrl: '/api/auth/login',
                scopes: {},
              },
            },
          },
        },
      },
  },
  apis: ['./src/controllers/*.js'],
  security: [{ oauth2: [] }],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
