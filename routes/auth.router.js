//used for login and signup
const express = require('express')
const app = express()

const authRouter = express.Router();

//import the two functions in the auth.controller
//because the functions were exported as objects they would have to be destructured during importation
const {
    createUser,
     login} = require("../controllers/auth.controller");
// create account is a post request
authRouter.post('/signup', function(req, res, next) {
    createUser
});
// authRouter.post('/login', login);    
authRouter.post('/login', function(req, res, next) {
    login
});

module.exports = authRouter;