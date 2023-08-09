const express = require("express");
const router = express.Router();

const { authController } = require('../controllers/index.controller');

//TODO mdw
router.post("/login", authController.validateUser); //FUNCIONA



module.exports = router;