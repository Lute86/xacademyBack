const {users, teachers, courses} = require("../models");
const { Op } = require('sequelize');
const db = require('../models');
const bcrypt = require('bcrypt');


const createUser = async (user) => {
  try {
    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the saltRounds
    user.password = hashedPassword;

    //defaultValue role user
    const newUser = await users.create(user);
    return newUser;
  } catch (err) {
    console.error("Error when creating User", err);
    throw err;
  }
};


const getUserByCriteria = async (options) => {
  try {
    const user = await users.findAll({
      where: {
        [Op.or]: [
          { id: options.id },
          { first_name: options.first_name },
          { last_name: options.last_name },
          { email: options.email },
          { role: options.role },
        ],
      },
    });
    return user;
  } catch (err) {
    console.error("Error when fetching User", err);
    throw err;
  }
};

const updateUser = async (userId, updates) => {
  try {
    const user = await users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await user.update(updates);
    return updatedUser;
  } catch (err) {
    console.error("Error when updating User", err);
    throw err;
  }
};

const getFullCourse = async (courseId) => {
  try {
    const course = await courses.findByPk(courseId, { include: {all:true} });
    if (course) {
      console.log(course.course_name);
    }
    return course;
  } catch (err) {
    console.error("Error when fetching Course", err);
    throw err;
  }
};


const addCourseToTeacher = async (teacherId, courseId) => {
  try {
    const teacher = await teachers.findByPk(teacherId);

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    const course = await courses.findByPk(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    await teacher.addCourse(course);

    return { message: "Course added to the teacher successfully" };
  } catch (err) {
    console.error("Error adding course to teacher", err);
    throw err;
  }
};

const addCourseToUser = async (userId, courseId) => {
  try {
    const user = await users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const course = await courses.findByPk(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    await user.addCourse(course);

    return { message: "Course added to the user successfully" };
  } catch (err) {
    console.error("Error adding course to user", err);
    throw err;
  }
};

// Soft delete user
const deleteUser = async (userId) => {
  try {
    const user = await users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    //Delete User
    await user.destroy();
    return user;
  } catch (err) {
    console.error("Error when deleting User", err);
    throw err;
  }
};

const getAllDeleted = async (modelName) => {
  const model = db[modelName];

  if (!model) {
    throw new Error(`Model ${modelName} not found`);
  }

  try {
    const records = await model.findAll({
      paranoid: false,
      where: {
        deletedAt: { [Op.ne]: null },
      },
    });
    return records;
  } catch (err) {
    console.error(`Error when fetching all deleted ${modelName}`, err);
    throw err;
  }
};

module.exports = { createUser, getUserByCriteria, updateUser, addCourseToTeacher, addCourseToUser, getAllDeleted, getFullCourse, deleteUser };
