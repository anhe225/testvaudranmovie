'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

ReviewSchema.statics.like = function (id) {
  var Review = mongoose.model('review');

  return Review.findById(id).then(function (review) {
    ++review.likes;
    return review.save();
  });
};

mongoose.model('review', ReviewSchema);
//# sourceMappingURL=review.js.map