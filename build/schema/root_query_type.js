'use strict';

var mongoose = require('mongoose');
var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLList = graphql.GraphQLList,
    GraphQLID = graphql.GraphQLID,
    GraphQLNonNull = graphql.GraphQLNonNull;

var MovieType = require('./movie_type');
var ReviewType = require('./review_type');
var Review = mongoose.model('review');
var Movie = mongoose.model('movie');

var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: function fields() {
    return {
      //récupérer tous les films
      movies: {
        type: new GraphQLList(MovieType),
        resolve: function resolve() {
          return Movie.find({});
        }
      },
      // retrouver un film par son id
      movie: {
        type: MovieType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: function resolve(parentValue, _ref) {
          var id = _ref.id;

          return Movie.findById(id);
        }
      },
      review: {
        // retrouver une review par son id
        type: ReviewType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: function resolve(parentValue, _ref2) {
          var id = _ref2.id;

          return Review.findById(id);
        }
      }
    };
  }
});

module.exports = RootQuery;
//# sourceMappingURL=root_query_type.js.map