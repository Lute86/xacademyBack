const express = require('express');
const router = express.Router();
const {courseController} = require('../controllers/index.controller');




router.get("/all", courseController.getAllCourses)  
//router.get("/:courseId", courseController.getCourse)
router.get("/:param", courseController.getCourseByCriteria)

//mover a admin
router.post('/create', courseController.createCourse)
router.put('/update/:courseId', courseController.updateCourse)
router.delete('/delete/:courseId', courseController.deleteCourse)

module.exports = router;