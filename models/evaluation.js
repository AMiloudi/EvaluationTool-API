// models/game.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  studentId:  { type: Schema.Types.ObjectId, ref: 'users' },
  name:       { type: String, required: true },
  picture:    {type: String, required:true}
});

const batchSchema = new Schema({
  students: [studentSchema],
  class:      {type: Number, required:true},
  startDate:  { type: Date },
  endDate:    { type: Date },
});

module.exports = mongoose.model('batches', batchSchema)
