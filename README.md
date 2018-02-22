# Evaluations Tool API

RESTful Express API for Evaluations on top of MongoDB.

## Authentication

Create a User with the following attributes:

| Attribute | Type   | Description   |
|-----------|--------|---------------|
| name      | string | Full name     |
| email     | string | Email address |
| password  | string | Password      |

Use the following endpoints to deal with initial authentication and the user.

| HTTP Verb | Path        | Description |
|-----------|-------------|--------------|
| `POST`    | `/users`    | Create a user account |
| `POST`    | `/sessions` | Log in with email and password, and retrieve a JWT token |

To authorize further requests, use Bearer authentication with the provided JWT token:

```
Authorization: Bearer <token here>
```

_**Note**: See `db/seed.js` for an example._

## Batches

**Note:** See `models/batch.js` for the Batch schema attributes.

| HTTP Verb | Path | Description |
|-----------|------|--------------|
| `GET` | `/batches` | Retrieve all batches |
| `POST` | `/batches` | Create a batch* |
| `GET` | `/batches/:batchId` | Retrieve a single batch by it's `batchId` |
| `PUT` | `/batches/:batchId` | Update a batch with a specific `batchId`* |
| `PATCH` | `/batches/:batchId` | Patch (partial update) a batch with a specific `batchId`* |
| `DELETE` | `/batches/:batchId` | Destroy a single batch by it's `batchId`* |
| | | _* Needs authentication_ |

## Students

**Note:** See `models/student.js` for the Student schema attributes.

| HTTP Verb | Path | Description |
|-----------|------|--------------|
| `GET` | `/batches/:batchId/students` | Retrieve all students for a specific `batchId` |
| `POST` | `/batches/:batchId/students` | Create a student for a specific `batchId`* |
| `GET` | `/students/:studentId` | Retrieve a single student by it's `studentId` |
| `PUT` | `/students/:studentId` | Update a student with a specific `studentId`* |
| `PATCH` | `/students/:studentId` | Patch (partial update) a student with a specific `studentId`* |
| `DELETE` | `/students/:studentId` | Destroy a single student by it's `studentId`* |
| | | _* Needs authentication_ |

## Evaluations

**Note:** See `models/evaluations.js` for the Evaluation schema attributes.

| HTTP Verb | Path | Description |
|-----------|------|--------------|
| `GET` | `/students/:studentId/evaluations` | Retrieve all evaluations for a specific `studentId` |
| `POST` | `/students/:studentId/evaluations` | Create an evaluation for a specific `studentId`* |
| `GET` | `/evaluations/:evaluationId` | Retrieve a single evaluation by it's `evaluationId` |
| `PUT` | `/evaluations/:evaluationId` | Update an evaluation with a specific `evaluationId`* |
| `PATCH` | `/evaluations/:evaluationId` | Patch (partial update) an evaluation with a specific `evaluationId`* |
| `DELETE` | `/evaluations/:evaluationId` | Destroy a single evaluation by it's `evaluationId`* |
| | | _* Needs authentication_ |

_**Note**: Run `yarn run seed` to seed some initial batchs, students and evaluations._
