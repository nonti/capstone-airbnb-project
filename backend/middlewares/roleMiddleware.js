const authoriseRole = (...alllowedRoles) => {
  return (req, res, next) => {
    if(!alllowedRoles.includes(req.user.role)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}

module.exports = authoriseRole