const { courses } = require("../models");
const { Op } = require('sequelize')


const createCourse = async (course) => {
  try {
    const newCourse = await courses.create(course);
    return newCourse;
  } catch (err) {
    console.error("Error when creating Course", err);
    throw err;
  }
};

const getCourse = async (courseId) => {
  try {
    //TODO => modify include, just teachers , { include: [teachers] }
    const course = await courses.findByPk(courseId);
    if (course) {
      console.log(course.course_name);
    }
    return course;
  } catch (err) {
    console.error("Error when fetching Course", err);
    throw err;
  }
};

const getCourseByCriteria = async (options) => {
  try {
    const course = await courses.findAll({
      where: {
        [Op.or]: [
          { id: options.id },
          { course_name: options.course_name },
          { modality: options.modality },
          { type: options.type },
        ],
      },
    });
    return course;
  } catch (err) {
    console.error("Error when fetching Course", err);
    throw err;
  }
};

const getAllCourses = async () => {
  try {
    const course = await courses.findAll();
    return course;
  } catch (err) {
    console.error("Error when fetching Course", err);
    throw err;
  }
};

const updateCourse = async (courseId, updates) => {
  try {
    const course = await courses.findByPk(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const updatedCourse = await course.update(updates);
    return updatedCourse;
  } catch (err) {
    console.error("Error when updating User", err);
    throw err;
  }
};

// Soft delete the course by setting the deletedAt timestamp
const deleteCourse = async (courseId) => {
  try {
    const course = await courses.findByPk(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    //Delete Course
    await course.destroy();
    return course;
  } catch (err) {
    console.error("Error when deleting Course", err);
    throw err;
  }
};


module.exports = { createCourse, getCourse, getAllCourses, deleteCourse, updateCourse, getCourseByCriteria };
