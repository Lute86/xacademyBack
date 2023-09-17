const express = require("express");
const { adminController, courseController, queryController, teacherController, userController } = require("../controllers/index.controller");
const router = express.Router();


//queries
router.get("/query/:param", queryController.getQueryByCriteria) // :param = id, reason


//users
router.post('/user/create', adminController.createUser) 
router.get('/user/param/:param', adminController.getUserByCriteria) // :param => id, first_name, last_name, role, email
router.get('/user/all', userController.getAllUsers) 
router.delete('/user/delete/:userId', adminController.deleteUser) 
//TODO update

//courses
router.get('/course/related/:courseId', adminController.getFullCourse)
router.post("/course/create", courseController.createCourse) 
router.put('/course/update/:courseId', courseController.updateCourse)
router.delete('/course/delete/:courseId', courseController.deleteCourse) 

//teachers
router.get('/teacher/:teacherId', teacherController.getTeacher) 
//router.get('/teacher/all', teacherController.getAllTeachers) // TODO
router.post('/teacher/create', teacherController.createTeacher)
router.put('/teacher/update/:teacherId', teacherController.updateTeacher)
router.delete('/teacher/delete/:teacherId', teacherController.deleteTeacher) 

//relations
router.post('/teacher/:teacherId/course/:courseId', adminController.addCourseToTeacher); 
router.post('/user/:userId/course/:courseId', adminController.addCourseToUser); 

//deleted
router.get('/deleted/:param', adminController.getAllDeleted) // => :param = teachers, courses, users



module.exports= router