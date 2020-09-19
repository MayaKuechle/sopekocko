/*
 
 * This script acts as the user controller
 * With the help of these functions, users can sign up and log in securely onto the app
 
*/


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/* 
This function makes sure that you can signup securely
*/

exports.signup = (req, res, next) => {
  
    bcrypt.hash(req.body.password, 10).then( //hash function, 1st data we want to hash, then salt (10) secure
    
      (hash) => {

        const user = new User({ //create new user
          userId: req.body.email,
          email: req.body.email,
          password: hash
        });

        user.save().then( //save it to the database
          () => { //sends another promise
            res.status(201).json({ //send a JSON mesage
              message: 'User added successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
};

/* 
This function makes sure that you can login securely
*/

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then( //to findif email addresss same as email in request body
      (user) => {
        if (!user) { //if user doesnt get send back then error
          return res.status(401).json({ //return so function stops
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then( // we want to compare password to the hash in the database of the user
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign( //sign method takes a few arguments
              { userId: user._id }, //json object containing any data we want to encode into the token
              'RANDOM_TOKEN_SECRET', //second argument, secret key for hashing
              { expiresIn: '24h' }); //configuration object
            res.status(200).json({ //if we arrive here its a valid user
              userId: user._id, //they will need user id for found user
              token: token //its expecting an authentication token
            });
          }
        ).catch( //if bcrypt goes wrong
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
}