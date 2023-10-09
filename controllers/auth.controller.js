const authService = require('../services/auth.services');


const validateUser = async (req, res) => {
  try {
    const user = await authService.validateUser(req.body);
    if(user.status === 400 || user.status === 404)
      return res.status(user.status).json({ errors: [{ msg: 'Invalid credentials', error: user.message }] });

    if (user) {
      // Store user info in the session upon successful login
      req.session.user = user;
      console.log(user.id)
      return res.status(200).json({ user });
    }

  } catch (err) {
    console.error("Error when validating User", err);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

module.exports = { validateUser };
