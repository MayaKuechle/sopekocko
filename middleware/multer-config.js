/*
 
 * This script is the multer middleware
 * Multer is a package which allows us to handle incoming files in HTTP requests
 * In this file we implement file uploads, to allow users to upload images

*/

const multer = require('multer');

//to allow users to upload images of the things they want to 
//sell.  We will be doing this using  multer , a package which
// allows us to handle incoming files in HTTP requests

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//configure multer to export a configured version
const storage = multer.diskStorage({ //storage helps multer how to save a file what to save and how
  destination: (req, file, callback) => { //will tell multer where to save file
    callback(null, 'images'); //pass two arguments, 1st if we receive an error, 2nd where we want to save it
  },
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_'); //we need to give filename and file extension + split it by white space and rejoin with underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); //Date.now adds time stamp
  }
});

module.exports = multer({storage: storage}).single('image');