const mongoose = require("mongoose");

const CourseCatalog = new mongoose.Schema({
  platformName: {
    type: String,
    required: [true, "Provide course platform Name!"],
  },
  courses: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Catalog", CourseCatalog);
