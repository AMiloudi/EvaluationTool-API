// models/game.js
const mongoose = require('../config/database')
const { Schema } = mongoose


const rankingSchema= new Schema({
  studentId:  { type: Schema.Types.ObjectId, ref: 'users' },
  rankDate:   { type: Date, required: true},
  color:      { type: String, default: "Red"},
  remarks:    { type: String}
});

const studentSchema = new Schema({
  studentId:  { type: Schema.Types.ObjectId, ref: 'users' },
  name:       { type: String, required: true },
  picture:    {type: String, required:true}

});

const batchSchema = new Schema({
  students: [studentSchema],
  class:      {type: Number, required:true},
  startDate:  { type: Date, required: true},
  endDate:    { type: Date, required: true},
});



module.exports = mongoose.model('batches', batchSchema)
