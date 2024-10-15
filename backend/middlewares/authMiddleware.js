const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers['authorization']; // Simplified header check

  // Check if Authorization header exists and starts with 'Bearer '
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
  }

  if (!token) {
    return res.status(401).json({ message: 'Token is not provided, authorization denied' });
  }

  try {
    // Verify token and attach decoded user to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded user is', req.user); // For debugging
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Token verification failed' });
    }
  }
};

module.exports = verifyToken;
