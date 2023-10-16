/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name for login
 *         email:
 *           type: string
 *           description: E-mail address for login
 *         password:
 *           type: string
 *           description: Password for login
 *       example:
 *         username: testUser
 *         email: testUser@gmail.com
 *         password: testPassword
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /api/auth/signup:
 *   post:
 *     summary: Sign-up to create user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: testUser
 *               email:
 *                 type: string
 *                 example: testUser@gmail.com
 *               password:
 *                 type: string
 *                 example: testPassword
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * 
 * /api/auth/login:
 *   post:
 *     summary: Login for access token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testUser@gmail.com
 *               password:
 *                 type: string
 *                 example: testPassword
 *     responses:
 *       200:
 *         description: Successfully Logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - User not found.
 *       500:
 *         description: Internal Server Error
 */


const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => {
        const token = jwt.sign(user.toJSON(), 'secret', {
          expiresIn: 604800,
        });
        res.status(201).json({
          success: true,
          token,
          message: 'Successfully saved a new user with a token',
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findAll()
      .then((users) => {
        if (users === null) {
          res.status(200)
            .send('no users');
        } else {
          res.status(200)
            .send(users);
        }
      })
      .catch((error) => res.status(400).send(error.message));
  },

  retrieve(req, res) {
    return User
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          if (User.validPassword(user, req.body.password)) {
            const token = jwt.sign(user.toJSON(), 'secret', {
              expiresIn: 604800,
            });
            res.status(200).json({
              success: true,
              token,
              message: 'Successfully Logged in',
            });
          } else {
            res.status(403).json({
              success: false,
              message: 'Authentication failed, Wrong password!',
            });
          }
        } else {
          res.status(403)
            .json({
              success: false,
              message: 'Authentication failed, User not found',
            });
        }
      })
      .catch((error) => res.status(400).json(error));
  },

  user(req, res) {
    return User
      .findOne({ where: { id: req.decoded.id } })
      .then((user) => {
        if (user) {
          res.status(200).json({
            success: true,
            user,
          });
        } else {
          res.status(403)
            .json({
              success: false,
              message: 'Authentication failed, User token expired',
            });
        }
      })
      .catch((error) => res.status(400).json(error));
  },
};
