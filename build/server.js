'use strict';

var express = require('express');
var models = require('./models');
var expressGraphQL = require('express-graphql');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var schema = require('./schema/schema');

var app = express();

// Remplacer avec ton url mlab
var MONGO_URI = 'mongodb://vaudranpc:vaudran89@ds159641.mlab.com:59641/dbpascal';
if (!MONGO_URI) {
  throw new Error('Tu dois fournir une url mongoDB');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useMongoClient: true
});
mongoose.connection.once('open', function () {
  return console.log('Connecté à MongoLab');
}).on('error', function (error) {
  return console.log('Erreur de connexion à MongoLab:', error);
});

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

var webpackMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
//# sourceMappingURL=server.js.map