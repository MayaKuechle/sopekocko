/*
 
 * This script is the authentication middleware
 * It protects selected routes, and ensures that a user is authenticated before allowing their requests to go through
 * Each piece of middleware receives the request and response objects, 
 * and can read, parse, and manipulate them as necessary

*/


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //split header around space, we want second element, the token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) { //if request body has a userId & that userId is not the same as the same userId we extracted from the token
      throw 'Invalid user ID'; //if not it's invalid
    } else {
      next(); //otherwise everything is in order, passes onto next middleware in route
    }
  } catch {
    res.status(401).json({ //in case any errors happen, the catch block lets us know.
      error: new Error('Invalid request!')
    });
  }
};