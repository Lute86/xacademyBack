const  courseService  = require("../services/course.services");

const createCourse = async (req, res) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ action: "createCourse", error: err.message });
  }
};

const getCourseByCriteria = async (req, res) => {
  try {
    const options = {
      id: req.params.param,
      course_name: req.params.param,
      modality: req.params.param,
      type: req.params.param,
    };

    const course = await courseService.getCourseByCriteria(req, options);
    if (!course) {
      res.status(404).json({ action: "getCourse", error: "Course Not Found" });
    } else {
      res.json(course);
    }
  } catch (err) {
    res.status(500).json({ action: "getCourse", error: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const course = await courseService.getAllCourses(req);
    if (!course) {
      res.status(404).json({ action: "getAllCourses", error: "Course Not Found" });
    } else {
      res.json(course);
    }
  } catch (err) {
    res.status(500).json({ action: "getAllCourses", error: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.courseId, req.body);
    if (!course) {
      res.status(404).json({ action: "updateCourse", error: "Course Not Found" });
    } else {
      res.json(course);
    }
  } catch (err) {
    res.status(500).json({ action: "updateCourse", error: err.message });
  }
}


const deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.courseId);
    if (!course) {
      res.status(404).json({ action: "deleteCourse", error: "Course Not Found" });
    } else {
      res.json(course);
    }
  } catch (err) {
    res.status(500).json({ action: "deleteCourse", error: err.message });
  }
}




module.exports = { createCourse, getAllCourses, deleteCourse, updateCourse, getCourseByCriteria };
