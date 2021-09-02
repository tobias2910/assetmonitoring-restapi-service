import ConfigData from '../config/config';

export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Asset Tracker Rest API',
        version: '1.0.0',
        description: 'This API provides the collected and processed asset information from the relevant social media channels.',
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
        contact: {
            name: 'Tobias Caliskan',
            email: 'asset.monitoring.api@gmail.com'
        }
    },
    servers: [
        {
            url: `/api/v1`
        }
    ]
}