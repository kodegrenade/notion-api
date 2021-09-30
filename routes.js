const express = require("express");
const router = express.Router();
const NotionController = require("./services/notion");

/**
 * @swagger
 * /api/v1/create/post:
 *   post:
 *     tags:
 *       - Blog Post
 *     name: Create Blog Post
 *     summary: Request to create blog post
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
 *             title:
 *               type: string
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *             description:
 *               type: text
 *         required:
 *           - title
 *           - tags
 *           - description
 *     responses:
 *       201:
 *         description:  Blog Post created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// create database
router.post('/create/post', NotionController.createBlogPost);

/**
 * @swagger
 * /api/v1/blog/posts:
 *   get:
 *     tags:
 *       - Blog Post
 *     name: Blog Posts
 *     summary: Request to retrieve all blog posts
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Blog Posts Object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
// blog posts
router.get("/blog/posts", NotionController.blogPosts);


module.exports = router;
