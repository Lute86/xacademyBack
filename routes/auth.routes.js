const express = require("express");
const router = express.Router();
const { validateRegistration } = require('../middleware/validations/validation.middleware')
const { authController, userController } = require('../controllers/index.controller');


router.post("/register", validateRegistration, userController.createUser);

router.post("/login", authController.validateUser); 

router.post('/logout', (req, res) => {
  // Clear the user's session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    // Redirect or respond with success message
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;