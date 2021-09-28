const express = require("express");
const router = express.Router();
const NotionController = require("./services/notion");

/**
 * @swagger
 * /api/v1/create/database:
 *   post:
 *     tags:
 *       - Basic
 *     name: Create Database
 *     summary: Send request create a database
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *             page_id:
 *               type: string
 *             title:
 *               type: string
 *             properties_title:
 *               type: string
 *             properties_description:
 *               type: string
 *         required:
 *           - type
 *           - page_id
 *           - title
 *           - properties_title
 *           - properties_description
 *     responses:
 *       200:
 *         description: Query results object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// create database
router.post('/create/database', NotionController.createDatabase);

/**
 * @swagger
 * /api/v1/query/database:
 *   get:
 *     tags:
 *       - Basic
 *     name: Query Database
 *     summary: Send request to query a database
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Query results object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// query database
router.get("/query/database", NotionController.queryDatabase);


module.exports = router;
