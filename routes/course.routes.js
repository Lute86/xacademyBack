const express = require('express');
const router = express.Router();
const {courseController} = require('../controllers/index.controller');




router.get("/all", courseController.getAllCourses)  
router.get("/:param", courseController.getCourseByCriteria)



module.exports = router;