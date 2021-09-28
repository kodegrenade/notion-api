const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = express()

require('dotenv').config({ path: __dirname + '/.env' })

// set server port
const PORT = process.env.PORT || 5000

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
}));

// swagger configuration
const swaggerDefinition = {
    info: {
        title: "Notion Api",
        version: "1.0.0",
        description: "Endpoint to explore notion api"
    },
    host: "localhost:5000",
    basePath: "/",
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
}

const options = {
    swaggerDefinition,
    apis: ["./routes.js"],
}

const swaggerSpec = swaggerJsDoc(options)

app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
})

app.get("/", (req, res) => {
    res.send("Welcome to notion api")
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/', routes)

// start server
app.listen(PORT, console.log(`Server is running on port ${PORT}`))