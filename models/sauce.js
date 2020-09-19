/*
 
 * This script is the sauce model
 * By using Mongoose to manage my MongoDB database it can implement strict data schemas to make my app more robust

*/


const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true }, //set up object with its type
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number},
    dislikes: { type: Number},
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true }
});

module.exports = mongoose.model('Sauce', sauceSchema);