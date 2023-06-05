const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  artist: {
    type: String,
    require: true,
  },
  albums: {
    type: [String],
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  imgUrl: {
    type: String,
    require: true,
  },
  trackUrl: {
    type: String,
    require: true,
  },
  trackAbout: {
    type: String,
    require: true,
  },
  isLiked: {
    type: Boolean,
    require: true,
  },
  genres: {
    type: [String],
    require: true,
  },
  moods: {
    type: [String],
    require: true,
  },
  instruments: {
    type: [String],
    require: true,
  },
});

module.exports = mongoose.model("track", trackSchema);
