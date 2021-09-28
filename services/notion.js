const dotenv =  require('dotenv').config()
const formValidator = require('../middleware/formValidator')
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const database_id = process.env.NOTION_DATABASE_ID

class NotionController {

    /**
     * Create Database
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns array
     */
    static async createDatabase(req, res) {
        // validation rules
        let rules = {
            'type': 'required',
            'page_id': 'required',
            'title': 'required',
            'properties_title': 'required',
            'properties_description': 'required'
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
            type,
            page_id,
            title,
            properties_title,
            properties_description,
        } = req.body

        const bodyParams = {
            parent: {
                type: type,
                page_id: page_id,
            },
            title: [
                {
                    type: "text",
                    text: {
                        content: title,
                        link: null,
                    }
                }
            ],
            properties: {
                Name: {
                    title: properties_title,
                },
                Description: {
                    rich_text: properties_description
                },
            },
        }

        const payload = {
            path: `databases`,
            method: 'POST',
            body: bodyParams,
        };

        try {            
            await notion.request(payload).then(result => {
                return res.status(200).json({
                    error: false,
                    message: "Database created",
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
     * Query Database
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns array
     */
    static async queryDatabase(req, res) {
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
                        description: page.properties.Description.rich_text[0].text.content
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