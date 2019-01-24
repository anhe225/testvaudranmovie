'use strict';

var mongoose = require('mongoose');
var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLList = graphql.GraphQLList,
    GraphQLID = graphql.GraphQLID,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLString = graphql.GraphQLString;

var Review = mongoose.model('review');

var ReviewType = new GraphQLObjectType({
  name: 'ReviewType',
  fields: function fields() {
    return {
      id: { type: GraphQLID },
      likes: { type: GraphQLInt },
      content: { type: GraphQLString },
      movie: {
        type: require('./movie_type'),
        resolve: function resolve(parentValue) {
          return Review.findById(parentValue).populate('movie').then(function (review) {
            return review.movie;
          });
        }
      }
    };
  }
});

module.exports = ReviewType;
//# sourceMappingURL=review_type.js.map