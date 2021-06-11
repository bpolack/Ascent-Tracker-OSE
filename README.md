# Ascent Tracker OSE
A very simple time tracker for allocating your employee time across different projects, and tracking hours for payroll purposes. Great for freelancers and consultants.
React / Redux / Express / MongoDB 

## Description
Simple time tracking for freelancers and consultants. Keep better track of your time and budgets for small projects and small teams.

## Run in Dev Mode
Prior to running the application, a valid MongoDB instance is required for use. It's reccommended that MongoDB Atlas is used to host a cloud based instance of the database. Once a valid database instance is created, users may add their database information to a file ".env" in the primary backend folder. A sample of this file is included ".env-sample".

To easily run the project in dev, use [npm concurrently](https://www.npmjs.com/package/concurrently) configured to start both backend and frontend at the same time.
```
cd backend
npm run dev
```

## Recommendations for Deployment
It is recommended that the backend api be deployed to Heroku for serving requests. The frontend React application may be compiled and hosted via any regular web server. 

## Roadmap

### Backend

1. Determine REST API routes required for backend :white_check_mark:
2. Configure routes and middleware needed for user registration and auth :white_check_mark:
3. Configure routes for handling project management and adding / viewing time chunks :white_check_mark:
4. Run postman tests on each route :white_check_mark:
5. Create API documentation :white_check_mark:

### Frontend

1. Configure React and React Router :white_check_mark:
2. Set up API utilities and Redux global store :white_check_mark:
3. Set up frontend JWT authentication, login and register components :white_check_mark:
4. Set up user profile component :white_check_mark:
5. Create card based view for managing projects :white_check_mark:
6. Create popup components for editing and deleting projects :white_check_mark:
7. Create card based view for managing time :white_check_mark:
8. Create calendar based view for managing time :white_check_mark:
9. Create popup components for editing and deleting time chunks :white_check_mark:
10. Test all vital components with Jest unit, snapshot, and dom testing :white_check_mark:

## Prerequisites

NPM, MongoDB
Recommended easy deployment on Heroku + Mongo Atlas

## REST API Documentation

Backend API documentation is described at the following link:


## Built With

* Node
* Express
* React
* Redux
* Mongoose
* JWT

## Authors

* **[Braighton Polack](https://github.com/bpolack/)** - Dev

See also the list of [contributors](https://github.com/bpolack/ascent-tracker-ose/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
