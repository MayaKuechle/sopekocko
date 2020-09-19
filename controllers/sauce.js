/*
 
 * This script acts as the sauce controller
 * This document includes all functions needed to: see the array of sauces + add/modify/delete and like sauces

*/


const Sauce = require('../models/sauce'); //import of the sauce model
const fs = require('fs'); //for file system to help delete

/* 
This function makes sure to get the whole array of sauces onto the page from the database
*/

exports.saucesInDatabase = (req, res, next) => {
  Sauce.find().then( //leave () empty, because we want all items from the database
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error //send back an object with an error
      });
    }
  );
}

/* 
This function makes sure that you can click on a sauce in the sauce array, 
and that it brings you to the exact sauce you clicked
*/

exports.sauceId = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}

/* 
This function helps to upload a sauce onto the database
*/

exports.saveSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce ({ //set up object with its type
      name: req.body.sauce.name, 
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: "",
      usersDisliked: ""
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

/* 
With this function you can modify a sauce
*/

exports.updateSauce = (req, res, next) => { //updating sauce with the Mongoose model 
  const url = req.protocol + '://' + req.get('host');

  let sauce = new Sauce({ _id: req.params._id });
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = { //set up object with its type
      _id: req.params.id, //important because otherwise the id will change if you update it
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: "",
      usersDisliked: ""
    };
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
        });
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}

/* 
With this function you can delete a sauce
*/

exports.deleteSauce = (req, res, next) => { //whenever we delete something it finds it in the database and deletes it
  const url = req.protocol + '://' + req.get('host');

  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const sauceImage = sauce.imageUrl;
      const sauceSplit = sauceImage.split('/images/');
      var final = './images/'+ sauceSplit[1]
      
      fs.unlink(final, function (err) {
       
        res.status(200).json(sauce);
    }); //directory string split of URL file system unlink function which deletes a file
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
  Sauce.deleteOne({_id: req.params.id}).then( //
    () => { //once it is deleted we delete it in database
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

/* 
This function makes sure you can like/dislike and cancel a like/dislike
*/

exports.like = (req, res, next) => {
  
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
    let like = req.body.like;
    let userId = req.body.userId;

      if (like === 1) {
  
        if(!sauce.usersLiked.find(element => element === userId)){

          sauce.usersLiked.push(userId)
        
          sauce.likes ++;
        }

      } else if (like === 0) {
       
        if(sauce.usersLiked.find(element => element === userId)){
          
          sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1); 

          sauce.likes --;
          
        } else if (sauce.usersDisliked.find(element => element === userId)) {

          sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);

          sauce.dislikes --;
        }

      } 
      
      else if (like === -1) {

        if(!sauce.usersDisliked.find(element => element === userId)){
          
          sauce.usersDisliked.push(userId)
        
          sauce.dislikes ++;
        }

      } 
      
      sauce.save().then(
        () => {
          res.status(201).json({
            message: 'Rating saved successfully!'
          });
      })
    }
  ) 
  .catch(
    (error) => {
        res.status(400).json({
        error: error
      });
    }
  );
} 