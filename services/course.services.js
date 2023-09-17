const { courses, teachers } = require("../models");
const { Op } = require("sequelize");

const createCourse = async (course) => {
  try {
    const newCourse = await courses.create(course);
    return newCourse;
  } catch (err) {
    console.error("Error when creating Course", err);
    throw err;
  }
};

const getCourseByCriteria = async (req, options) => {
  try {
    //Return full course information if admin, else necessary info
    if (req.session.user && req.session.user.role == "admin") {
      const course = await courses.findAll({
        where: {
          [Op.or]: [
            { id: options.id },
            { course_name: options.course_name },
            { modality: options.modality },
            { type: options.type },
          ],
        },
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        include: [
          {
            model: teachers,
            as: "teachers",
          },
        ],
      });
      return course;
    } else {
      const course = await courses.findAll({
        where: {
          [Op.or]: [
            { id: options.id },
            { course_name: options.course_name },
            { modality: options.modality },
            { type: options.type },
          ],
        },
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        include: [
          {
            model: teachers,
            as: "teachers",
            through: { attributes: [] },
            attributes: ["first_name", "last_name"],
          },
        ],
      });
      return course;
    }
  } catch (err) {
    console.error("Error when fetching Course", err);
    throw err;
  }
};

const getAllCourses = async (req) => {
  try {
    //Return full course information if admin, else necessary info
    if (req.session.user && req.session.user.role == "admin") {
      const course = await courses.findAll({
        include: [
          {
            model: teachers,
            as: "teachers",
          },
        ],
      });
      return course;
    } else {
      const course = await courses.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        include: [
          {
            model: teachers,
            as: "teachers",
            through: { attributes: [] },
            attributes: ["first_name", "last_name"],
          },
        ],
      });
      return course;
    }
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

module.exports = {
  createCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  getCourseByCriteria,
};
