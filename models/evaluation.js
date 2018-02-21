const mongoose = require('../config/database')
const { Schema } = mongoose


const evaluationSchema= new Schema({
  studentId:  { type: Schema.Types.ObjectId, ref: 'students' },
  evalDate:   { type: Date, required: true},
  color:      { type: String, default: 'Red'},
  remarks:    { type: String}
});

module.exports = mongoose.model('evaluations', evaluationSchema)
