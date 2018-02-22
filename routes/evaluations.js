const router = require('express').Router()
const passport = require('../config/auth')
const { Evaluation } = require('../models/index')

const authenticate = passport.authorize('jwt', { session: false })

const loadEvaluation = (req, res, next) => {
  const evaluationId = req.params.evaluationId

  Evaluation.findById(evaluationId)
  .then((eval) => {
    req.evaluation = eval
    next()
  })
  .catch((error) => next(error))
}

module.exports = io => {
  router
  .get('/evaluations/:evaluationId', loadEvaluation, (req, res, next) => {
    if (!req.evaluation) { return next() }
    res.json(req.evaluation)
  })

  .patch('/evaluations/:evaluationId', authenticate, (req, res, next) => {
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


  .delete('/evaluations/:evaluationId', authenticate, (req, res, next) => {

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
