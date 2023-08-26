const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers['x-access-token'];

//     if (!authHeader) {
//       return res.status(401).json({ error: 'Authorization header missing' });
//     }

//     const [scheme, token] = authHeader.split(' ');

//     if ( !token || scheme !== 'JWT') {
//       return res.status(401).json({ error: 'Token missing' });
//     }

//     // Verify token and decode user information
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("authMiddleware => decode", decoded);
//     // Attach user information to the request object for later use
//     req.user = decoded;

//     // Move to the next middleware or route handler
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };
