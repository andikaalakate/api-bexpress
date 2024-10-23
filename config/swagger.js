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
    apis: ['./routes/swagger/*.js']
}

module.exports = swaggerOptions;