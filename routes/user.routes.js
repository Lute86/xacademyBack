const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index.controller')



// GET, PUT, DELETE => validar que sea usuario propio
//GET
router.get('/my/:userId', userController.getUser) 
//PUT
router.put("/update/:userId", userController.updateUser);
//DELETE
router.delete("/delete/:userId", userController.deleteUser);





module.exports = router;