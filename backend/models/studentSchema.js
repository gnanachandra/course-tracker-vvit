const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide student name"],
    },
    rollNo: {
      type: String,
      required: [true, "Please provide roll number"],
      unique:[true,"Duplicate rollno entry"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: [true,"Duplicate email entry"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      index: true,
    },
    branch: {
      type: String,
      enum: [
        "CSE",
        "IT",
        "ECE",
        "EEE",
        "CSM",
        "AID",
        "IOT",
        "CIC",
        "MECH",
        "CIVIL",
      ],
      required: [true, "Please provide branch"],
    },
    section: {
      type: String,
      required: [true, "Please provide section"],
    },
    AICTEStudentID: {
      type: String,
      required: [true, "Please provide AICTE ID"],
      unique: true,
      index: true,
    },
    year: {
      type: String,
      required: [true, "Please provide year"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    role: {
      type: String,
      default: "Student",
    },
  },{
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

studentSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

studentSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "student",
});

studentSchema.virtual("queries", {
  ref: "Query",
  localField: "_id",
  foreignField: "student",
});

module.exports = mongoose.model("Student", studentSchema);
