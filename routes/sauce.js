/*
 
 * This script is for the sauce routes
 * Sauce routes are registered to Express router and then register that router to the app
 
*/


const express = require('express'); //import express
const router = express.Router(); //create router with express function

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/sauce');

router.get('/sauces', stuffCtrl.saucesInDatabase);
router.get('/sauces/:id', auth, stuffCtrl.sauceId);
router.post('/sauces', auth, multer, stuffCtrl.saveSauce);
router.put('/sauces/:id', auth, multer, stuffCtrl.updateSauce);
router.delete('/sauces/:id', auth, stuffCtrl.deleteSauce);
router.post('/sauces/:id/like', auth, stuffCtrl.like);

module.exports = router; //so that it is available outside of project and available to app