const mongoose = require("mongoose");

const setSchema = mongoose.Schema({
  reps: Number,
  weight: Number,
});

const exerciseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name value"],
    },
    setsNumber: {
      type: Number,
      required: [true, "Please add a sets number"],
    },
    sets: [setSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
