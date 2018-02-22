
const router = require('express').Router()
const passport = require('../../config/auth')
const { Batch, Student } = require('../../models')

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

  .patch('/batches/:batchId/students/:studentId', authenticate, (req, res, next) => {
    const studentId = req.params.studentId

    Student.findById(studentId)
      .then((student) => {
        if (!student) { return next() }

        const updatedStudent = {
          name: req.body.name,
          picture:  req.body.picture,
          batchId:  req.batch._id,
        }

        Student.findByIdAndUpdate(studentId, updatedStudent, { new: true })
          .then((student) => {
            res.json(student)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })


  .delete('/batches/:batchId/students/:studentId', authenticate, (req, res, next) => {
    const studentId = req.params.studentId

    Student.findByIdAndRemove(studentId)
    .then(() => {
      res.status = 200
      res.json({
        message: 'Removed',
        _id: studentId
      })
    })
    .catch((error) => next(error))
  })


  return router
}
