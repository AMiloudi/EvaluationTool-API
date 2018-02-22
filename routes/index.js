const batches = require('./batches')
const batchStudents = require('./batches/students')
const users = require('./users')
const sessions = require('./sessions')
const students = require('./students')
const studentEvaluations = require('./students/evaluations')
const evaluations = require('./evaluations')
const batchEvaluations = require('./batches/evaluations')

module.exports = {
  batches,
  batchStudents,
  users,
  sessions,
  students,
  studentEvaluations,
  evaluations,
  batchEvaluations
}
