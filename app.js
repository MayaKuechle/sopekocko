/*
 
 * This script acts as the Express app which is a series of functions
 * To save time while writing web servers and avoiding to manually parse every incoming request,
 * Express framework makes these tasks much simpler, and allows to build the APIs in half the time
  
*/

// Mongoose PW: hLuGnb88QtkpsPbp
// MOngoose: mongodb+srv://maya:<password>@cluster0-zj0n2.mongodb.net/<dbname>?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); //help us generate the path for the images

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//const Sauce = require('./models/sauce');

const app = express();

mongoose.connect('mongodb+srv://guest:nebZa3QWprFXyBbX@cluster0-zj0n2.mongodb.net/saucedatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}); //allows all requests from all origins to access your API (localhost:3000 +8081)

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); //express.static function tells the app which static folder to serve

app.use('/api', sauceRoutes); //set end routes '' and stuffRoutes as Router to be used
app.use('/api/auth', userRoutes);

module.exports = app; // we need to export to access from outside JS file