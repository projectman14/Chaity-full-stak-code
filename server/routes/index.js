import express from 'express'
import { registerUser } from '../controller/registerUser.js'
import { checkEmail } from '../controller/checkEmail.js'
import { checkPassword } from '../controller/checkPassword.js'
import { userDetails } from '../controller/userDetails.js'
import { logout } from '../controller/logout.js'
import { updateUserDetails } from '../controller/updateUserDetails.js'
import { searchUser } from '../controller/searchUser.js'

const router = express.Router()

router
    .post('/register', registerUser)
    .post('/email' , checkEmail)
    .post('/password',checkPassword)
    .get('/user-details' , userDetails)
    .get('/logout' , logout)
    .post('/update-user' , updateUserDetails)
    .post('/search-user' , searchUser)

export { router }