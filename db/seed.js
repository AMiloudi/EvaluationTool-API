const mongoose = require('../config/database')
const request = require('superagent')
const user = require('./fixtures/user.json')
const students = require('./fixtures/students.json')
const batches = require('./fixtures/batches.json')
const evaluations = require('./fixtures/evaluations.json')


const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}


const createEvaluations = (token, studentId) => {

  var rand = Math.floor(Math.random() * evaluations.length);
  let evaluation = evaluations[rand]

  return request
  .post(createUrl(`/students/${studentId}/evaluations`))
  .set('Authorization', `Bearer ${token}`)
  .send(evaluation)
  .then((res) => {
    console.log('Evaluation ' + res.body.color + ' seeded for student ' + res.body.name)
  })
  .catch((err) => {
    console.error('Error seeding evaluations!', err)
  })
}

const createStudents = (token, batchId) => {
  return students.map((student) => {
    student.batchId = batchId
    return request
    .post(createUrl(`/batches/${batchId}/students`))
    .set('Authorization', `Bearer ${token}`)
    .send(student)
    .then((res) => {
      console.log('Student ' + res.body.name + ' seeded in class ' + res.body.classNumber)
      return createEvaluations(token, res.body._id)
    })
    .catch((err) => {
      console.error('Error seeding students!', err)
    })
  })
}

const createBatches = (token) => {
  return batches.map((batch) => {
    return request
    .post(createUrl('/batches'))
    .set('Authorization', `Bearer ${token}`)
    .send(batch)
    .then((res) => {
      console.log('Batch seeded...', res.body)
      return createStudents(token, res.body._id)
    })
    .catch((err) => {
      console.error('Error seeding batches!', err)
    })
  })
}

const authenticate = (email, password) => {
  request
  .post(createUrl('/sessions'))
  .send({ email, password })
  .then((res) => {
    console.log('Authenticated!')
    return createBatches(res.body.token)
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
