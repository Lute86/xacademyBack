const authService = require('../services/auth.services');


const validateUser = async (req, res) => {
  try {
    const user = await authService.validateUser(req.body);

    if (user) {
      // Store user info in the session upon successful login
      req.session.user = user;
      console.log(user.id)
      return res.status(200).json({ user });
    }

    return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
  } catch (err) {
    console.error("Error when validating User", err);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

module.exports = { validateUser };
