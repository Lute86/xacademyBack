const express = require("express");
const router = express.Router();

const { authController, userController } = require('../controllers/index.controller');


router.post("/register", userController.createUser);

router.post("/login", authController.validateUser); //FUNCIONA

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