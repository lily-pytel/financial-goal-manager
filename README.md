# financial-goal-manager

A financial goal planner created for the Georgia Tech OMSCS Class "CS6460: Educational Technology".
The tool allows user to set financial goals, enter progress for them, and get advice based on their financial situation.

## Requirements for development:

- Node
- Docker
- MongoDB

## Requirements to run:

- Docker
- docker-compose

## To Run

- To develop: `npm run start`
- To run docker for development: `docker-compose build` followed by `docker-compose up`
- To run docker for production: `docker-compose -f docker-compose-production.yml up --build`

The project will be available in `http://localhost:8000`
