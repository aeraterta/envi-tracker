/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *       properties:
 *         id:
 *           type: uuid
 *           description: The auto-generated id of the user.
 *         username:
 *           type: string
 *           description: Username for login
 *       example:
 *         id: 4522ade2-d32a-4b02-a73a-0dce81219b12
 *         username: testUser
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /login:
  *   get:
 *     summary: Protected route that requires a valid token
 *     tags: [User]
 *     security:
 *       - BearerAuth: [] # This indicates that this route requires a Bearer token
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: This is a protected route
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Login for access token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: 4522ade2-d32a-4b02-a73a-0dce81219b12
 *               username:
 *                 type: string
 *                 example: testUser
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET;
const authenticateToken = require('../middlewares/auth');
const router = express.Router();
router.use(express.json());

router.post('/login', (req, res) => {
  const { id, username } = req.body;
  
  if (!id || !username) {
    return res.status(400).json({ error: 'Both id and username are required in the request body' });
  }

  const user = {
    id: id,
    username: username,
  };

  const token = jwt.sign(user, secretKey);
  res.json({ token });
});

router.get('/login', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
