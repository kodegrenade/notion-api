const dotenv =  require('dotenv').config()
const formValidator = require('../middleware/formValidator')
const { Client } = require('@notionhq/client')
const { v4: uuidv4 } = require('uuid')

// Init client
const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

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
            'title': 'required',
            'tags': 'required',
            'body': 'required',
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
            description
        } = req.body

        // post date
        let date = new Date()
        let timestamp = `${date.getFullYear()}-${ (date.getMonth() > 0 && date.getMonth() < 10 ? '0' : '') }${date.getMonth() + 1}-${date.getDate()}`

        const body = {
            parent: {
                page_id: uuidv4(),
                database_id: database_id
            },
            properties: {
                Title: [
                    {
                        type: "text",
                        text: {
                            content: "Hello"
                        }
                    }
                ],
                // Name: {
                //     title: [
                //         {
                //             text: {
                //                 content: title
                //             },
                //         }
                //     ],
                // },
                // Description: {
                //     rich_text: [{
                //         type: "text",
                //         text: {
                //             content: description
                //         }
                //     }]
                // },
                // Tags: {
                //     multi_select: [
                //         tags.reduce((a, v) => ({ ...a, [v]: v}), {})
                //     ],
                // },
            },
        }

        const payload = {
            path: `databases`,
            method: 'POST',
            body: body,
        };

        try {
            await notion.pages.create(payload).then(result => {
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
                        body: page.properties.Description.rich_text[0].text.content
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
}

module.exports = NotionController