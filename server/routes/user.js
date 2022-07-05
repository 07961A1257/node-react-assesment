const express = require("express");
const pool = require("../helpers/database");
const { sortNames } = require("../utility/utility");
const router = express.Router();
// const bcrypt = require("bcrypt");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - role
 *      properties:
 *        id:
 *          type: number
 *          description: auto-generated id of user
 *        name:
 *          type: string
 *          description: name of the user
 *        email:
 *          type: string
 *          description: email of the user
 *        role:
 *          type: string
 *          description: role of the user
 *      example:
 *        id: 1
 *        name: Chaitanya
 *        email: test@123.com
 *        role: employee
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: email of the user
 *        password:
 *          type: string
 *          description: password of user
 *      example:
 *        email: test@123.com
 *        password: 123456
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async function (req, res) {
  try {
    const sqlQuery = "SELECT id,name,email,role FROM SYS.USER";
    let rows = await pool.query(sqlQuery);
    if (rows !== undefined) {
      // rows = rows.sort((a, b) => (a.name > b.name ? 1 : -1));
      rows = rows.sort(sortNames);
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Get the user details
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Get the user details
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Login'
 *       404:
 *        description: requested user was not found
 */
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const sqlQuery =
      "SELECT id, name, email, role FROM SYS.USER WHERE email=? AND password=?";
    const rows = await pool.query(sqlQuery, [email, password]);

    if (rows.length <= 0) {
      res.status(404).send(`Invalid Credentials`);
    } else if (rows !== undefined) {
      res.status(200).json(rows);
    } else {
      res.status(404).send(`Invalid Credentials`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the individual user by id
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: individual user by id
 *     responses:
 *       200:
 *         description: Get the individual user by id
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *        description: requested user was not found
 */
router.get("/:id", async function (req, res) {
  try {
    const sqlQuery = "SELECT id, name, email, role FROM SYS.USER WHERE id=?";
    const rows = await pool.query(sqlQuery, req.params.id);
    if (rows !== undefined) {
      res.status(200).json(rows);
    } else {
      res.status(404).send(`User with ${req.params.id} was not found`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// router.post("/register", async function (req, res) {
//   try {
//     const { name, email, password, role } = req.body;
//     //const encryptedPassword = bcrypt.hash(password, 5);
//     const sqlQuery =
//       "INSERT INTO sys.user (name, email, password, role) VALUES(?,?,?,?)";
//     const result = await pool.query(sqlQuery, [name, email, password, role]);
//     res.status(200).json({ userId: result.insertId });
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

module.exports = router;
