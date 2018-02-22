// routes/games.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, User } = require('../models')


const authenticate = passport.authorize('jwt', { session: false })

module.exports = io => {
  router
    .get('/batches', (req, res, next) => {
      Batch.find()
      // Send the data in JSON format
        .then((batches) => res.json(batches))
        // Throw a 500 error if something goes wrong
        .catch((error) => next(error))
    })
    .get('/batches/:id', (req, res, next) => {
      const id = req.params.id

      Batch.findById(id)
        .then((batch) => {
          if (!batch) { return next() }
          res.json(batch)
        })
        .catch((error) => next(error))
    })

    .post('/batches', authenticate, (req, res, next) => {
      const newBatch = {
        classNumber: req.body.classNumber,
        startDate:  req.body.startDate,
        endDate:  req.body.endDate,
      }

      Batch.create(newBatch)
        .then((batch) => {
          res.json(batch)
        })
        .catch((error) => next(error))
    })

    .patch('/batches/:batchId', authenticate, (req, res, next) => {
      const batchId = req.params.id

      Batch.findById(batchId)
        .then((batch) => {
          if (!batch) { return next() }

          const updatedBatch = {
            classNumber: req.params.classNumber,
            startDate:  req.params.startDate,
            endDate:  req.params.endDate,
          }

          Batch.findByIdAndUpdate(id, updatedBatch, { new: true })
            .then((batch) => {
              res.json(batch)
            })
            .catch((error) => next(error))
        })
        .catch((error) => next(error))
    })
    .delete('/batches/:batchId', authenticate, (req, res, next) => {
      const batchId = req.params.id
      Batch.findByIdAndRemove(id)
        .then(() => {
          res.status = 200
          res.json({
            message: 'Removed',
            _id: id
          })
        })
        .catch((error) => next(error))
    })

  return router
}
