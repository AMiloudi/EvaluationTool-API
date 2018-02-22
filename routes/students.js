
const router = require('express').Router()
const passport = require('../config/auth')
const { Student } = require('../models/index')

const authenticate = passport.authorize('jwt', { session: false })

const loadStudent = (req, res, next) => {
  const studentId = req.params.studentId

  Student.findById(studentId)
  .then((student) => {
    req.student = student
    next()
  })
  .catch((error) => next(error))
}

module.exports = io => {
  router
  .get('/students/:studentId', loadStudent, (req, res, next) => {
    if (!req.student) { return next() }
    res.json(req.student)
  })

  .patch('/students/:studentId', authenticate, (req, res, next) => {
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


  .delete('/students/:studentId', authenticate, (req, res, next) => {
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
