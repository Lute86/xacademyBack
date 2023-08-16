const regularUserMDW = (req, res, next) => {
  const user = req.session.user;
  if (user && user.role === 'user') {
    next(); // Allow access for users
  } else {
    res.status(403).json({ error: 'Access forbidden' }); // Deny access for non-admins
  }
};

const userIsAdminMDW = (req, res, next) => {
  const user = req.session.user;
  if (user && user.role === 'admin') {
    next(); // Allow access for admins
  } else {
    res.status(403).json({ error: 'Access forbidden' }); // Deny access for non-admins
  }
};


module.exports = { userIsAdminMDW, regularUserMDW };
