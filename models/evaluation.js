const mongoose = require('../config/database')
const { Schema } = mongoose


const rankingSchema= new Schema({
  studentId:  { type: Schema.Types.ObjectId, ref: 'students' },
  rankDate:   { type: Date, required: true},
  color:      { type: String, default: 'Red'},
  remarks:    { type: String}
});

module.exports = mongoose.model('evaluations', rankingSchema)
