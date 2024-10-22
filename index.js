require('dotenv').config()

const express = require("express")
const swaggerjsdoc =  require('swagger-jsdoc')
const swaggerUi =  require('swagger-ui-express')

const bodyParser = require("body-parser")
const blogRouter = require("./routes/Blog")

const app =  express()
const PORT = parseInt(process.env.PORT) || 1234

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            openapi: '2.0.0',
            title: 'Coba API',
            description: 'Coba API Information',
            contact: {
                name: 'Andika Alakate'
            },
            version: '1.0.0',
        },
        basePath: '/v1',
        schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: 'Blog',
                description: 'Endpoints for managing blogs',

            }
        ],
        servers: [
            {
                url: "http://localhost:3000/v1"
            }
        ],
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())
app.listen(PORT, () => {
    console.log("Server berjalan di port ", PORT)
})

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set routing
app.use('/v1/blog', blogRouter);