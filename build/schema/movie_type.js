'use strict';

var mongoose = require('mongoose');
var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLID = graphql.GraphQLID,
    GraphQLList = graphql.GraphQLList;

var ReviewType = require('./review_type');
var Movie = mongoose.model('movie');

var MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: function fields() {
    return {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      reviews: {
        type: new GraphQLList(ReviewType),
        resolve: function resolve(parentValue) {
          return Movie.findReviews(parentValue.id);
        }
      }
    };
  }
});

module.exports = MovieType;
//# sourceMappingURL=movie_type.js.map