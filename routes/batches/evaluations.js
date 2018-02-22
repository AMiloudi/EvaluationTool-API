const router = require('express').Router()
const passport = require('../../config/auth')
const { Batch, Student, Evaluation } = require('../../models/index')

const authenticate = passport.authorize('jwt', { session: false })

const loadBatch = (req, res, next) => {
  const batchId = req.params.batchId

  Batch.findById(batchId)
  .then((batch) => {
    req.batch = batch
    next()
  })
  .catch((error) => next(error))
}

const getStudents = (req, res, next) => {
  const batchId= req.batch._id
  Student.find({
    batchId: batchId
  })
  .then((students) => {
    req.students = students
    next()
  })
  .catch((error) => next(error))

}

const getEvaluations = (req, res, next) => {
  let student_ids = []
  req.students.map((student) => {
    student_ids.push(student._id)
  })

  Evaluation.find({
    'studentId': { $in: student_ids}
  })
  .then((evaluations) => {
    req.evals = evaluations
    next()
  })
  .catch((error) => next(error))


}

module.exports = io => {
  router
  .get('/batches/:batchId/evaluations', loadBatch, getStudents, getEvaluations, (req, res, next) => {
    if (!req.batch || !req.students || !req.evals) { return next() }
    res.json(req.evals)
  })

  return router
}
