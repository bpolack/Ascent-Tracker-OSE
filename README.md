# Ascent Tracker OSE
A very simple time tracker for allocating employee time across different projects or clients, and tracking hours for payroll purposes. Great for small teams.
React / Redux / Express / MongoDB 

## Description
Simple time tracking for small teams. Keep better track of your time and budgets for collaborative projects.

## Testing
For ease of testing, use [npm concurrently](https://www.npmjs.com/package/concurrently) configured to start both backend and frontend at the same time.

## Roadmap

### Backend

1. Determine REST API routes required for backend :white_check_mark:
2. Configure routes and middleware needed for user registration and auth :white_check_mark:
3. Configure routes for handling project management and adding / viewing time chunks :white_check_mark:
4. Run unit tests on each route, and on middleware functions independently

### Frontend

1. Do stuff

## Prerequisites

NPM, MongoDB
Recommended easy deployment on Heroku + Mongo Atlas

## REST API Documentation

Backend API documentation is described below.

### Users

#### Public Endpoints

Create a User: `POST /api/users/`
Register a new user. Requires a firstname, lastname, email, and valid password as shown below.
```
{
    "fname": "First Name",
    "lname": "Last Name",
    "email": "Valid Email Address",
    "password": "Password of at least 8 characters"
}
```
Response:
```
{
    "token": "JSON Web Token"
}
```

Authenticate User: `POST /api/users/login/`
Authenticate a user to get auth token
```
{
    "email": "Email of an existing user",
    "password": "Password"
}
```
Response:
```
{
    "token": "JSON Web Token"
}
```

#### Private Endpoints - Requires Valid Authentication Token x-auth-token

Fetch User Info: `GET /api/users/`
Get the currently authorized users information
Response:
```
{
    "_id": "",
    "email": "",
    "fname": "",
    "lname": "",
    "dateMod": "",
    "dateCreate": ""
}
```


## Built With

* Node
* Express
* React
* Redux
* Mongoose
* JWT

## Authors

* **[Braighton Polack](https://github.com/bpolack/)** - Dev

See also the list of [contributors](https://github.com/bpolack/node-time-tracker/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* TBD