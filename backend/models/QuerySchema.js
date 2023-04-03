const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    description: {
      type: String,
      required: [true, "Description cannot be empty"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema);
