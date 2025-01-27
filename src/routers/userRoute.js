const userRouter = require('express').Router();
const { userMiddleware, hitControllMiddleware } = require('../moddlewares');
const { sendOTP, verifyOTP } = require('../controllers');
userRouter.post('/sendOTP', hitControllMiddleware, sendOTP);
module.exports = userRouter;