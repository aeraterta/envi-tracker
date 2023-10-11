// routes.js
const express = require('express');
const router = express.Router();

router.get('/api/users', (req, res) => {
  // Handle GET request for fetching users
  console.log("router.get('/api/users')");
  res.json({ message: "router.get('/api/users')" });
});

router.post('/api/users', (req, res) => {
  // Handle POST request for creating a new user
  console.log("router.post('/api/users')");
  res.json({ message: "router.post('/api/users')" });
});

router.get('/api/example', (req, res) => {
  res.json({ message: 'Example API endpoint' });
});

module.exports = router;
