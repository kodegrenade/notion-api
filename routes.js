const express = require('express')
const router = express.Router();
const NotionController = require('./services/notion')

router.get('/videos', NotionController.getVideos)

module.exports = router