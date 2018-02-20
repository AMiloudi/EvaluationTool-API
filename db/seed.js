const mongoose = require('../config/database')
const request = require('superagent')
const user = require('./fixtures/user.json')
const students = require('./fixtures/students.json')
const batches = require('./fixtures/batches.json')
const evaluations = require('./fixtures/evaluations.json')


const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

const createBatches = (token) => {
  return batches.map((batch) => {
    return request
    .post(createUrl('/batches'))
    .set('Authorization', `Bearer ${token}`)
    .send(batch)
    .then((res) => {
      console.log('Batches seeded...', res.body.title)
    })
    .catch((err) => {
      console.error('Error seeding batches!', err)
    })
  })
}

const createEvaluations = (token) => {
  return evaluations.map((evaluation) => {
    return request
    .post(createUrl('/evaluations'))
    .set('Authorization', `Bearer ${token}`)
    .send(evaluation)
    .then((res) => {
      console.log('Evaluations seeded...', res.body.title)
    })
    .catch((err) => {
      console.error('Error seeding evaluations!', err)
    })
  })
}

const createStudents = (token) => {
  return students.map((student) => {
    return request
    .post(createUrl('/students'))
    .set('Authorization', `Bearer ${token}`)
    .send(student)
    .then((res) => {
      console.log('Students seeded...', res.body.title)
    })
    .catch((err) => {
      console.error('Error seeding students!', err)
    })
  })
}

const authenticate = (email, password) => {
  request
  .post(createUrl('/sessions'))
  .send({ email, password })
  .then((res) => {
    console.log('Authenticated!')
  })
  .catch((err) => {
    console.error('Failed to authenticate!', err.message)
  })
}

request
.post(createUrl('/users'))
.send(user)
.then((res) => {
  console.log('User created!')
  return authenticate(user.email, user.password)
})
.catch((err) => {
  console.error('Could not create user', err.message)
  console.log('Trying to continue...')
  authenticate(user.email, user.password)
})
