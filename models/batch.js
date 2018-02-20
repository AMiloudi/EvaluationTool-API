const mongoose = require('../config/database')
const { Schema } = mongoose


const batchSchema = new Schema({
  classNumber:  {type: Number, required:true},
  startDate:    { type: Date, required: true},
  endDate:      { type: Date, required: true},
});

module.exports = mongoose.model('batches', batchSchema)
