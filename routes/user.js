/*
 
 * This script is for the user routes
 * User routes are registered to Express router and then register that router to the app
 
*/


const express = require('express');
const router = express.Router(); //we create a router

const userCtrl = require('../controllers/user'); //we need to import user controller

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);

module.exports = router; //so that it is available outside of project and available to app