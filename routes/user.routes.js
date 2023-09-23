const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index.controller');
const { validateRegistration } = require('../middleware/validations/validation.middleware');
const { validatePayment } = require('../middleware/validations/paymentValidation.mdw')

//GET
//ping
router.get('/my/status/:userId', userController.getUserStatus)
//get partial user info
router.get('/my/:userId', userController.getUser)
//get courses related to user
router.get('/my/courses/:userId', userController.getUserCourses)

//POST
//add specified course to the user
router.post('/:userId/addCourse/:courseId', userController.addCourseToUser)
//payment
router.post('/:userId/payment', validatePayment, userController.payment)

//PUT
//update user info, only allowed fields
router.put("/update/:userId", validateRegistration, userController.updateUser); //TODO validate updates(ie. email)
//modify subscription status to true
router.put('/my/subscription/:userId', userController.subscribeUser)
//modify subscription status to false
router.put('/my/unsubscription/:userId', userController.unsubscribeUser)
//TODO check lack of server update when subscribing, requires relogin


//DELETE
//delete user
router.delete("/delete/:userId", userController.deleteUser);
//delete specified course from user
router.delete("/:userId/removeCourse/:courseId", userController.removeCourseFromUser);





module.exports = router;