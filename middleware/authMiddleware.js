const jwt = require('jsonwebtoken');
const user = require("../models/index").user;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Verify token and decode user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("==================>", decoded);
    // Attach user information to the request object for later use
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;




// const jwt = require('jsonwebtoken'),
//     config = require('../config/postgresqldb'),
//     User = require('../models/index').user;

// async function authMiddleware(req, res, next) {
//   const token = req.header('Authorization');
//   console.log("--------------->", token);

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     // Verify token and decode user information
//     const decoded = jwt.verify(token, process.env.jwtSecret);

//     // Fetch user from the database based on decoded userId
//     const user = await User.findByPk(decoded.userId);
//     console.log("===============>", user);

//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Attach user information to the request object for later use
//     req.user = user;

//     // Move to the next middleware or route handler
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// module.exports = authMiddleware;
