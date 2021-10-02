const dotenv =  require('dotenv').config()
const formValidator = require('../middleware/formValidator')
const { Client } = require('@notionhq/client')
const { v4: uuidv4 } = require('uuid')

// Init client
const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

// database being queried
const database_id = process.env.NOTION_DATABASE_ID

class NotionController {

    /**
     * Create Blog Post
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns array
     */
    static async createBlogPost(req, res) {
        // validation rules
        let rules = {
            "title": "required|min:5",
            "tags": "required",
            "content": "required|min:5",
            "author": "required|min:3",
        }

        // validate request body
        let validator = formValidator(req, rules)
        if (validator) {
            return res.status(203).json({
                error: true,
                message: validator
            })
        }

        let {
            title,
            tags,
            content,
            author,
        } = req.body

        // post date
        let date = new Date()
        let timestamp = `${date.getFullYear()}-${ (date.getMonth() > 0 && date.getMonth() < 9 ? '0' : '') }${date.getMonth() + 1}-${ (date.getDate() > 0 && date.getDate() < 10 ? '0': '')}${date.getDate()}`

        // body
        const data = {
            "parent": {
                "database_id": database_id
            },
            "properties": {
                "Name": {
                    "title": [
                        {
                            "type": "text",
                            "text": {
                                "content": title,
                            },
                        },
                    ]
                },
                "Date": {
                    "type": "date",
                    "date": { "start": timestamp },
                },
                "Description": {
                    "rich_text": [
                        {
                            "text": {
                                "content": content,
                            },
                        },
                    ]
                },
                "Tags": {
                    "rich_text": [
                        {
                            "text": {
                                "content": tags.join(", ").trim()
                            }
                        }
                    ],                    
                },
                "Author": {
                    "rich_text": [
                        {
                            "text": {
                                "content": author
                            }
                        }
                    ]
                }
            },
        }

        // request payload
        const payload = {
            path: "pages",
            method: "POST",
            body: data
        };

        try {
            await notion.request(payload).then(result => {
                return res.status(201).json({
                    error: false,
                    message: "Blog post created successfully",
                    data: result,
                })
            }).catch(error => {
                return res.sendStatus(error)
            })
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    /**
     * Blog Posts
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns array
     */
    static async blogPosts(req, res) {
        const payload = {
            path: `databases/${database_id}/query`,
            method: 'POST'
        }
        
        try {
            await notion.request(payload).then(results => {
                const data = results.results.map((page) => {
                    return {
                        id: page.id,
                        title: page.properties.Name.title[0].text.content,
                        date: page.properties.Date.date.start,
                        tags: page.properties.Tags.rich_text[0].text.content,
                        body: page.properties.Description.rich_text[0].text.content,
                        author: page.properties.Author.rich_text[0].text.content,
                    }
                })
                return res.status(200).json(data)
            }).catch(error => {
                return res.sendStatus(error)
            })
        } catch (error) {
            return res.sendStatus(500)
        }
    }

    /**
     * Search Blog
     * 
     * @param {*} req 
     * @param {*} res 
     * @return object
     */
    static async searchBlogPost(req, res) {
        const rules = {
            "search": "required|min:3"
        }

        let validator = formValidator(req, rules)
        if (validator) {
            return res.status(203).json({
                error: true,
                message: validator 
            })
        }

        const query = req.body.search

        const payload = {
            path: "search",
            method: "POST",
            query: query,
        }

        try {
            await notion.request(payload).then(results => {
                const data = results.results.filter(object => object.object == "page")
                const records = data.filter(object => object.title === query).map((object) => {
                    return {
                        id: object.id,
                        title: object.properties.Name.title[0].text.content,
                        date: object.properties.Date.date.start,
                        tags: object.properties.Tags.rich_text[0].text.content,
                        body: object.properties.Description.rich_text[0].text.content,
                        author: object.properties.Author.rich_text[0].text.content,   
                    }
                })
                return res.status(200).json(records)
            }).catch(error => {
                return res.sendStatus(error)
            });
        } catch (error) {
            return res.sendStatus(500)
        }
    }
}

module.exports = NotionController