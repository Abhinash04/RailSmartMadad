const express = require('express');
const controller = require('../controllers/authController')
const {Auth, localVariables }= require('../middleware/auth');
const {registerMail }= require('../controllers/mailer');
const router = express.Router();


// POST METHODS
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser,(req,res) => res.end());
router.route('/login').post(controller.login);

// GET METHODS
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser,localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

// PUT METHODS
router.route('/updateuser').put( Auth, controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

module.exports = router;