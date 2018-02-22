
const router = require('express').Router()
const passport = require('../../config/auth')
const {  Student, Evaluation } = require('../../models')

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

const getEvaluations = (req, res, next) => {
  const studentId= req.student._id
  Evaluation.find({
    studentId: studentId
  })
  .then((evaluations) => {
    req.evaluations = evaluations
    next()
  })
  .catch((error) => next(error))

}

module.exports = io => {
  router
  .get('/students/:studentId/evaluations', loadStudent, getEvaluations, (req, res, next) => {
    if (!req.student || !req.evaluations) { return next() }
    res.json(req.evaluations)
  })

  .post('/students/:studentId/evaluations', authenticate, loadStudent, (req, res, next) => {
    if (!req.student) { return next() }

    const newEvaluation= {
      studentId: req.student._id,
      evalDate:  req.body.evalDate,
      color:  req.body.color,
      remarks: req.body.remarks
    }

    Evaluation.create(newEvaluation)
    .then((evaluation) => {
      res.json(evaluation)
    })
    .catch((error) => next(error))
  })

  .patch('/students/:studentId/evaluations/:evaluationId', authenticate, (req, res, next) => {
      const evaluationId = req.params.evaluationId

    Evaluation.findById(evaluationId)
      .then((evaluation) => {
        if (!evaluation) { return next() }

        const updatedEvaluation = {
          studentId: req.student._id,
          evalDate:  req.body.evalDate,
          color:  req.body.color,
          remarks: req.body.remarks
        }

        Evaluation.findByIdAndUpdate(evaluationId, updatedEvaluation, { new: true })
          .then((evaluation) => {
            res.json(evaluation)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })


  .delete('/students/:studentId/evaluations/:evaluationId', authenticate, (req, res, next) => {

    const evaluationId = req.params.evaluationId

    Evaluation.findByIdAndRemove(evaluationId)
    .then(() => {
      res.status = 200
      res.json({
        message: 'Removed',
        _id: evaluationId
      })
    })
    .catch((error) => next(error))
  })

  return router
}
