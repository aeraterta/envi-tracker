const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerSpec = require('./swagger');
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 5000;
const host = process.env.HOST || 'localhost';

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const server = app.listen( port, host, () => {
  console.log(`The server is running at ${host}:${port}`);
});

require('./src/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to envi-tracker API!',
}));
