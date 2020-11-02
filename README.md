# React-Snippet-Storage
A simple web app for saving code snippets to reuse easily. React / Express / MongoDB / Node

## Description
A bit of quick practice using React. Express backend uses the popular await async syntax for all Promise related funcitonality. Basic JWT authentication is implemented for simplicity, rather than using PassportJS, althought it could be easily converted to use Passport for other auth methods. For ease of testing, use [npm concurrently](https://www.npmjs.com/package/concurrently) configured to start both backend and frontend at the same time.

## Roadmap

1. Express/Mongo setup with simple JWT authentication :white_check_mark:
2. Backend REST API created with required user and snippet routes :white_check_mark:
3. React setup and config :white_check_mark:
4. Create user account control panel to allow signup / login / password change
5. Add/View/Search/Edit/Remove Code Snippets from user snippet panel

## Prerequisites

NPM, MongoDB
Recommended easy deployment on Heroku + Mongo Atlas

## Documentation

Backend API documentation is described below.

### Users
POST /api/users/

### Snippets
POST /api/snippets/

## Built With

* Node
* Express
* React
* React Bootstrap
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