const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')

const Validator = require('../app/validators/user')


// // login/logout
// routes.get('/login',SessionController.loginForm)
// routes.post('/login',SessionController.login)
// routes.post('/logout',SessionController.lgout)

// //reset password / forgot
// routes.get('/password-reset',SessionController.resetForm)
// routes.get('/forgot-password',SessionController.forgotForm)
// routes.post('/forgot-password',SessionController.forgot)
// routes.post('/password-reset',SessionController.reset)

// //user register UserController
routes.get('/register', UserController.registerForm)
routes.post('/register',Validator.post, UserController.post)

routes.get('/',Validator.show ,UserController.show)
routes.put('/',Validator.update, UserController.update)
// routes.delete('/', UserController.delete)

module.exports = routes