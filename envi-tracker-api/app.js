const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
const port = 5000;

// // Import middleware and routes
// const middleware = require('./middleware');
const routes = require('./src/routes/routes');

// // Use middleware
// app.use(middleware);

// Use routes
app.use(routes);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
