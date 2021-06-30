"use strict";
// import MongoDB from './app/services/mongoDB/mongoDB';
// import PostProcesser from './app/postProcesser/postProcessor';
// import ElasticSearch from './app/services/elasticSearch/elasticSearch';
// import Finnhub from './app/services/finnhub/finnhub';
// import Sentiment from './app/services/sentiment/sentiment';
// import RabbitMQ from './app/services/rabbitMQ/rabbitMQ';
// const ELASTIC_SEARCH_NODE = process.env.ELASTIC_SEARCH_NODE || 'http://localhost:9200';
// const ELASTIC_SEARCH_INDEX = process.env.ELASTIC_SEARCH_INDEX || 'assetmonitor'; 
// const esClient = new ElasticSearch (ELASTIC_SEARCH_NODE, ELASTIC_SEARCH_INDEX);
// const FINNHUB_URI = process.env.FINNHUB_URI || 'https://finnhub.io/api/v1';
// const FINNHUB_TOKEN = process.env.FINNHUB_TOKEN || 'c157os748v6pjqvbr9h0'; 
// const finnhub = new Finnhub (FINNHUB_TOKEN, FINNHUB_URI);
// const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/';
// const MONGO_DATABASE = process.env.MONGODB_DATABASE || 'assetIdentifier'; 
// const MONGO_DATA_COLLECTION = process.env.MONGODB_DATA_COLLECTION || 'postProcessorData';
// const MONGO_ASSET_COLLECTION = process.env.MONGODB_COLLECTION || 'assetInformation';
// const mongoDB = new MongoDB (CONNECTION_STRING);
// const RABBIT_URI = process.env.RABBITMQ_URI || 'localhost';
// const RABBIT_QUEUE = process.env.RABBITMQ_QUEUENAME || 'assetPosts';
// const rabbitMQ = new RabbitMQ (RABBIT_URI, RABBIT_QUEUE);
// let timeoutInMS: number | string | undefined = process.env.DEFAULT_TIMEOUT_IN_MS;
// if (timeoutInMS) {
//     timeoutInMS = parseInt(timeoutInMS);
// } else {
//     timeoutInMS = 1000;
// }
// const sentiment = new Sentiment ('http://0.0.0.0:5000/');
// const postProcessor = new PostProcesser (esClient, finnhub, sentiment, rabbitMQ, mongoDB, 
//                                          MONGO_DATABASE, MONGO_ASSET_COLLECTION, 
//                                          MONGO_DATA_COLLECTION, timeoutInMS);
//# sourceMappingURL=service.js.map