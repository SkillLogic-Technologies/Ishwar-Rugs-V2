import express from 'express';
import { loginUser, myProfile, verifyLoginOtp } from '../controllers/User.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';
const routes = express.Router();

routes.post('/login', loginUser);
routes.post('/verify-otp', verifyLoginOtp);
routes.get('/me',isAuth, myProfile);


export default routes;