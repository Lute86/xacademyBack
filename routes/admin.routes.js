const express = require("express");
const { adminController, courseController, queryController, teacherController, userController, emailController } = require("../controllers/index.controller");
const { validateCourse, validateCourseUpdate } = require("../middleware/validations/courseValidation.mdw");
const { validateRegistration } = require("../middleware/validations/registrationValidation.mdw");
const { validateUpdate } = require("../middleware/validations/userValidation.mdw");
const { validateTeacher, validateTeacherUpdate } = require("../middleware/validations/teacherValidation.mdw");
const { validateMailer } = require("../middleware/validations/emailValidation.mdw");
const { validateUpdateQuery } = require("../middleware/validations/queryValidation.mdw");
const router = express.Router();

//ping
router.get('/my/status/:userId', userController.getUserStatus)

//queries
router.get("/query/:param", queryController.getQueryByCriteria) // :param = id, "reason", all
router.delete("/query/delete/:queryId", queryController.deleteQuery)
router.post('/query/email', validateMailer, emailController.sendEmail)
router.put('/query/:queryId', validateUpdateQuery, queryController.updateQuery)

//users
router.get('/user/param/:param', adminController.getUserByCriteria) // :param => id, first_name, last_name, role, email
router.get('/user/all', userController.getAllUsers) 
router.post('/user/create', validateRegistration, adminController.createUser)
router.put('/user/update/:userId', validateUpdate, adminController.updateUser)
router.delete('/user/delete/:userId', adminController.deleteUser) 

//courses
router.get('/course/related/:courseId', adminController.getFullCourse)
router.post("/course/create", validateCourse, courseController.createCourse) 
router.put('/course/update/:courseId', validateCourseUpdate, courseController.updateCourse)
router.delete('/course/delete/:courseId', courseController.deleteCourse) 

//teachers
router.get('/teacher/:param', teacherController.getTeacher) // param = id, all
router.post('/teacher/create', validateTeacher, teacherController.createTeacher)
router.put('/teacher/update/:teacherId', validateTeacherUpdate, teacherController.updateTeacher)
router.delete('/teacher/delete/:teacherId', teacherController.deleteTeacher) 

//relations
router.post('/teacher/:teacherId/course/:courseId', adminController.addCourseToTeacher); 
router.post('/user/:userId/course/:courseId', adminController.addCourseToUser); 

//deleted
router.get('/deleted/:param', adminController.getAllDeleted) // => :param = teachers, courses, users



module.exports= router