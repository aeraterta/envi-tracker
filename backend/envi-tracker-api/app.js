const express = require('express');
const app = express();
const port = 3000;

// Import middleware and routes
const middleware = require('./middleware');
const routes = require('./routes');

// Use middleware
app.use(middleware);

// Use routes
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
