# React-Snippet-Storage
A simple web app for saving code snippets to reuse easily. React / Express / MongoDB / Node

## Description
A bit of quick practice using React. Express backend uses the popular await async syntax for all Promise related funcitonality. Basic JWT authentication is implemented for simplicity, rather than using PassportJS, although it could be easily converted to use Passport for other auth methods. For ease of testing, use [npm concurrently](https://www.npmjs.com/package/concurrently) configured to start both backend and frontend at the same time. Redux has been configured for global state.

## Broad Roadmap

1. Express/Mongo setup with simple JWT authentication :white_check_mark:
2. Backend REST API created with required user and snippet routes :white_check_mark:
3. React setup and config :white_check_mark:
4. Create user account control panel to allow signup / login / password change :white_check_mark:
5. Add/View/Search/Edit/Remove Code Snippets from user snippet panel

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

### Snippets

#### Private Endpoints - Requires Valid Authentication Token x-auth-token

Fetch Snippets: `GET /api/snippets/`
Fetch all of a users snippets
Response:
```
[
    {
        "_id": "",
        "name": "Name of Snippet",
        "user": "User ID",
        "desc": "Description of Snippet",
        "code": "Code Snippet Contents",
        "dateMod": "",
        "dateCreate": ""
    },
    {
        ...
    }
]
```

Create/Update Snippets: `POST /api/snippets/`
Create or update a snippet, technically any escaped code will be valid for use as a snippet
```
{
	"id": "Optional - Update will be attempted using provided ID",
    "name": "Hello World",
    "desc": "This is a nice snippet",
    "code": "console.log('hello world');"
}
```
Response:
```
{
    "_id": "",
    "name": "Hello World",
    "user": "",
    "desc": "This is a nice snippet",
    "code": "console.log('hello world');",
    "dateMod": "",
    "dateCreate": ""
}
```

Search Snippets: `GET /api/snippets/search/keywords`
Search & fetch all of a users snippets according to provided keywords, ensure your search keywords are properly url encoded
Response:
```
[
    {
        "_id": "",
        "name": "Name of Snippet",
        "user": "User ID",
        "desc": "Description of Snippet",
        "code": "Code Snippet Contents",
        "dateMod": "",
        "dateCreate": ""
    },
    {
        ...
    }
]
```

Fetch Single Snippet: `GET /api/snippets/id`
Fetch a single snippet by id
Response:
```
{
	"_id": "",
	"name": "Name of Snippet",
	"user": "User ID",
	"desc": "Description of Snippet",
	"code": "Code Snippet Contents",
	"dateMod": "",
	"dateCreate": ""
}
```

Delete Single Snippet: `DELETE /api/snippets/id`
Delete a single snippet by id
Response:
```
{
	"_id": "",
	"name": "Name of Snippet",
	"user": "User ID",
	"desc": "Description of Snippet",
	"code": "Code Snippet Contents",
	"dateMod": "",
	"dateCreate": ""
}
```

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