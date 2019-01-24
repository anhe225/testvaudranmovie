'use strict';

var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLID = graphql.GraphQLID;

var mongoose = require('mongoose');
var Movie = mongoose.model('movie');
var Review = mongoose.model('review');
var MovieType = require('./movie_type');
var ReviewType = require('./review_type');

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //ajout de film
    addMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString }
      },
      resolve: function resolve(parentValue, _ref) {
        var title = _ref.title;

        return new Movie({ title: title }).save().then(function (response) {
          return response;
        }).catch(function (erreur) {
          return new Error("Ce film existe déja.");
        });
      }
    },
    addReviewToMovie: {
      // ajouter une review au film ayant l'id movieId
      type: MovieType,
      args: {
        content: { type: GraphQLString },
        movieId: { type: GraphQLID }
      },
      resolve: function resolve(parentValue, _ref2) {
        var movieId = _ref2.movieId,
            content = _ref2.content;


        return Movie.addReview(movieId, content);
      }
    },
    likeReview: {
      //liker une review par son id
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve: function resolve(parentValue, _ref3) {
        var id = _ref3.id;

        return Review.like(id);
      }
    },
    deleteMovie: {
      // supprimer un film par son id
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: function resolve(parentValue, _ref4) {
        var id = _ref4.id;

        return Movie.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
//# sourceMappingURL=mutations.js.map