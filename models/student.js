const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  name:       {type: String, required: true },
  picture:    {type: String, required:true},
  batchId:    {type: Schema.Types.ObjectId, ref: 'batches'},
  color:      {type: String, default: 'Red'}
});


module.exports = mongoose.model('students', studentSchema)
