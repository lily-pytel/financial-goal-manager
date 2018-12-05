# financial-goal-manager

A financial goal planner created for the Georgia Tech OMSCS Class "CS6460: Educational Technology".
The tool allows user to set financial goals, enter progress for them, and get advice based on their financial situation.

## Requirements For Development

- Node
- Docker
- MongoDB

## Requirements For Production

- Docker
- docker-compose

## To Run Locally Without Docker

Run command `npm run start` or `npm run debug` to get Node debugging on the Chrome devtools console.

## To Run in Development Mode Using Docker
- Run `docker-compose build`
- Followed by `docker-compose up`

## To Run in Production Mode Using Docker
- Run `docker-compose build`
- Followed by `docker-compose -f docker-compose-production.yml up --build`
- Followed by `docker-compose up`

The project will be available in `http://localhost:8000`
