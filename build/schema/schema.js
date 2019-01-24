'use strict';

var _ = require('lodash');
var graphql = require('graphql');
var GraphQLSchema = graphql.GraphQLSchema;


var RootQueryType = require('./root_query_type');
var mutations = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
//# sourceMappingURL=schema.js.map