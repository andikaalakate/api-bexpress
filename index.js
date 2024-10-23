require('dotenv').config()

const express = require("express")
const app =  express()
const PORT = parseInt(process.env.PORT) || 1234
const cors = require('cors');
const routes = require("./routes")

const swaggerjsdoc =  require('swagger-jsdoc')
const swaggerUi =  require('swagger-ui-express')
const swaggerOptions = require("./config/swagger")
const swaggerDocs = swaggerjsdoc(swaggerOptions)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(PORT)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/v1', routes);