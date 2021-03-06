const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const OrderController = require('../app/controllers/OrderController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const { isLoggedRedirectToUser, onlyUsers } = require('../app/middlewares/session')


// login/logout
routes.get('/login',isLoggedRedirectToUser, SessionController.loginForm)
routes.post('/login',SessionValidator.login, SessionController.login)
routes.post('/logout',SessionController.logout)

//reset password / forgot
routes.get('/forgot-password',SessionController.forgotForm)
routes.get('/password-reset',SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

//user register
routes.get('/register', UserController.registerForm)
routes.post('/register',UserValidator.post, UserController.post)

//user show
routes.get('/', onlyUsers, UserValidator.show ,UserController.show)

//users update
routes.put('/',UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)

//user products
routes.get('/ads', UserController.ads)

routes.post('/orders', onlyUsers, OrderController.post)
routes.get('/orders',  (req,res) => res.render('orders/error'))

module.exports = routes