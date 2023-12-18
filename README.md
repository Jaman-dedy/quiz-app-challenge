# Quiz challenge

## Description <!-- omit in toc -->

Develop a backend for a real-time quiz application where users can join a quiz, answer questions, and see real-time results. We prefer that
you use NestJS for the backend framework, NATS for real-time event handling, and PostgreSQL for data storage. However, you are free to
use Node and other other event solution such as Kafka or RMQ.

## Tech stack

-  Nodejs/Nestjs
- Posttres with Typeorm
- Nats for real time events
## Features

* As A User I'm able to register with username, email and password
* As A user I'm able to login with my email and password
* As A quiz creator I'm able to create a quiz
* As A participant I'm able to view available quizzes
* As A participant I'm able to join a given quiz
* As A participant I'm able to answer to quiz questions
* As A participant I'm able to view My scores and streak score
* As User I can view the leaderboard.

## Api Endpoints, payload/responses

```
1. POST /users/register: Register a new user
```

paylaod,  all validations where implemented

```js
{
  "email": "user1@gmail.com",
  "password": "Password@123",
  "username": "Doe"
}
```

Response 

```js
{
	"confirmation": "You have successfully registed"
}
```

```
2. POST /users/login: Log in a user.
```
Paylaod

```js
{
  "email": "user1@gmail.com",
  "password": "Password@123"
}
```

Response : 
```js
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJ1c2VyIiwiX19lbnRpdHkiOiJSb2xlIn0sInNlc3Npb25JZCI6NDAsImlhdCI6MTcwMjkwODQ3MiwiZXhwIjoxNzAyOTA5MzcyfQ.1umK6oy2WdAwNMwQe5tsNISx1v-0INdcaMKU1FmfNW0"
}
```

```
3. POST /quizzes: Create a new quiz.
```

Paylaod :
```js
{
	"title": "Programming",
	"questions": [
		{
			"text": "What is an PHP",
			"options": [
				{
					"text": "A Programming language",
					"isCorrect": true
				},
				{
					"text": "A country",
					"isCorrect": false
				}
			]
		},
		{
			"text": "What is css",
			"options": [
				{
					"text": "A styling language",
					"isCorrect": true
				},
				{
					"text": "A snake",
					"isCorrect": false
				}
			]
		}
	]
}
```

Response : 

```js

{
	"quizID": 17,
	"confirmation": "Quiz created successfully"
}
```

```
4. GET /quizzes: List all available quizzes.
```

Response

```js
[
	{
		"id": 1,
		"title": "Geography",
		"status": "ongoing",
		"startTime": "2023-12-17T19:39:48.020Z",
		"endTime": "2023-12-17T20:39:48.020Z",
		"streakBonus": 5,
		"createdAt": "2023-12-17T18:39:48.056Z",
		"updatedAt": "2023-12-17T18:39:48.056Z",
		"deletedAt": null
	}
]
```

```
 5. GET /quizzes/:id: Get details of a specific quiz.
```
Response : 

```js
{
	"id": 1,
	"title": "Geography",
	"status": "completed",
	"startTime": "2023-12-17T19:39:48.020Z",
	"endTime": "2023-12-17T20:39:48.020Z",
	"streakBonus": 5,
	"createdAt": "2023-12-17T18:39:48.056Z",
	"updatedAt": "2023-12-17T20:00:00.169Z",
	"deletedAt": null,
	"questions": [
		{
			"id": 1,
			"text": "What is an ocean",
			"createdAt": "2023-12-17T18:39:48.056Z",
			"updatedAt": "2023-12-17T18:39:48.056Z",
			"deletedAt": null,
			"options": [
				{
					"id": 1,
					"text": "A big water entity",
					"isCorrect": true,
					"createdAt": "2023-12-17T18:39:48.056Z",
					"updatedAt": "2023-12-17T18:39:48.056Z",
					"deletedAt": null,
					"__entity": "OptionEntity"
				},
				{
					"id": 2,
					"text": "A country",
					"isCorrect": false,
					"createdAt": "2023-12-17T18:39:48.056Z",
					"updatedAt": "2023-12-17T18:39:48.056Z",
					"deletedAt": null,
					"__entity": "OptionEntity"
				}
			],
			"__entity": "QuestionEntity"
		},
		{
			"id": 2,
			"text": "What is Africa",
			"createdAt": "2023-12-17T18:39:48.056Z",
			"updatedAt": "2023-12-17T18:39:48.056Z",
			"deletedAt": null,
			"options": [
				{
					"id": 3,
					"text": "A continent",
					"isCorrect": true,
					"createdAt": "2023-12-17T18:39:48.056Z",
					"updatedAt": "2023-12-17T18:39:48.056Z",
					"deletedAt": null,
					"__entity": "OptionEntity"
				},
				{
					"id": 4,
					"text": "A type of bird",
					"isCorrect": false,
					"createdAt": "2023-12-17T18:39:48.056Z",
					"updatedAt": "2023-12-17T18:39:48.056Z",
					"deletedAt": null,
					"__entity": "OptionEntity"
				}
			],
			"__entity": "QuestionEntity"
		}
	]
}
```

```
 6. POST /quizzes/:id/participate: Join a quiz.
```
* The Id will be provided in the params

Response : 

```js
{
	"confirmation": "Successfully joined the quiz with ID 1",
	"questions": [
		{
			"id": 1,
			"text": "What is an ocean",
			"createdAt": "2023-12-17T18:39:48.056Z",
			"updatedAt": "2023-12-17T18:39:48.056Z",
			"deletedAt": null,
			"__entity": "QuestionEntity"
		},
		{
			"id": 2,
			"text": "What is Africa",
			"createdAt": "2023-12-17T18:39:48.056Z",
			"updatedAt": "2023-12-17T18:39:48.056Z",
			"deletedAt": null,
			"__entity": "QuestionEntity"
		}
	]
}
```

```
7. POST /quizzes/:id/answer: Submit an answer for a quiz question.
```

Payload : 

```js
{
	"questionId": 1,
	"selectedOption": 1
}
```

Response : 

```js
{
	"confirmation": "You have successful submitted your answer"
}
```

```
8. GET /quizzes/:id/score: Get the current score of the participant in a quiz.
```

Response : 

```js
{
	"currentScore": 1,
	"streakScore": 6
}
```

```
9. GET /leaderboard: View the leaderboard for quizzes.
```

Response : 

```js
[
	{
		"participantId": 1,
		"username": "John",
		"score": 1
	},
	{
		"participantId": 2,
		"username": "Doe",
		"score": 0
	}
]
```
## Quick Setup

1. With Docker 

`
After Cloning the repository, run the following commands
`

```bash
docker compose up -d postgres api
```

`To load the .env, there's env.example in the folder structure.
If you postgres server is up and running you should be able to connect wo the db
`

2. Run the Nats server with the following command

```bash
docker run -p 4222:4222 -p 8222:8222 nats-streaming -m 8222 -cid 'my-cluster' -SD
```

3. run the app locally

`
After Cloning the repository, run the following commands
`

```js
. npm install

. npm run start:dev

```

`
If you encouter any issue with the followiing package 
`

```js
@nestjs-plugins/nestjs-nats-streaming-transport
```

`Please consider running it with --force commande as follow : `

```
npm install @nestjs-plugins/nestjs-nats-streaming-transport --force
```
`
This is just work a round, but in a real project this should be fixed properly.
`

## Run tests

`
Time reason unfotunately we did not cover all the test senarios, but we have implemented a few testing cases.
`

```bash
- npmm run test:e2e :  to run the end to end tests
- npm run test:unitest : to run the unitest cases
- npm run test:integration : to run the integration tests
```



```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## Comfortable development

```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer maildev
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

`You will find an exhaustive documentation on swager after running the app on your specified port it should be`

```js
http://localhost:yourPort/docs
```
