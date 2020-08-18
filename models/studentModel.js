const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  USN: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
});

module.exports = Student = mongoose.model("student", studentSchema);