const router = require('express').Router()
const passport = require('../../config/auth')
const { Batch, Student } = require('../../models/index')

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

module.exports = io => {
  router
  .get('/batches/:batchId/students', loadBatch, getStudents, (req, res, next) => {
    if (!req.batch || !req.students) { return next() }
    res.json(req.students)
  })

  .post('/batches/:batchId/students', authenticate, loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }

    const newStudent= {
      name: req.body.name,
      picture:  req.body.picture,
      batchId:  req.batch._id,
    }

    Student.create(newStudent)
    .then((student) => {
      res.json(student)
    })
    .catch((error) => next(error))
  })

  return router
}
