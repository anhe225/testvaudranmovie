'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'review'
  }]
});

MovieSchema.statics.addReview = function (movieId, content) {
  var Review = mongoose.model('review');
  var Movie = mongoose.model('movie');

  return this.findById(movieId).then(function (movie) {

    var review = new Review({ content: content, movie: movie });
    movie.reviews.push(review);
    var updateMovie = Movie.findOneAndUpdate({ _id: movie._id }, { reviews: movie.reviews });
    return Promise.all([review.save(), updateMovie]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          review = _ref2[0],
          movie = _ref2[1];

      return movie;
    });
  });
};

MovieSchema.statics.findReviews = function (id) {
  return this.findById(id).populate('reviews').then(function (movie) {
    return movie.reviews;
  });
};

MovieSchema.pre("save", function (done) {
  var self = this;
  mongoose.models["movie"].findOne({ title: self.title }, function (err, user) {
    if (user) {
      done(new Error("Le titre doit être unique"));
    } else {
      done();
    }
  });
});
mongoose.model('movie', MovieSchema);
//# sourceMappingURL=movie.js.map