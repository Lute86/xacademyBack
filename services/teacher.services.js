const {teachers, courses} = require("../models");
const { Op } = require('sequelize');
const db = require('../models');

const createTeacher = async (user) => {
  try {
    const newTeacher = await teachers.create(user);
    return newTeacher;
  } catch (err) {
    console.error("Error when creating Teacher", err);
    throw err;
  }
};


const getTeacher = async (options) => {
  try {
    if(options.all){
      const allTeachers = await teachers.findAll();
      return allTeachers;
    }
    const teacher = await teachers.findByPk(options.id, { include: { all: true } });
    if (teacher) {
      console.log(teacher.firstName);
    }
    return teacher;
  } catch (err) {
    console.error("Error when fetching Teacher", err);
    throw err;
  }
};


const updateTeacher = async (teacherId, updates) => {
  try {
    const teacher = await teachers.findByPk(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    const updatedTeacher = await teacher.update(updates);
    return updatedTeacher;
  } catch (err) {
    console.error("Error when updating Teacher", err);
    throw err;
  }
};

// Soft delete the course by setting the deletedAt timestamp
const deleteTeacher = async (teacherId) => {
  try {
    const teacher = await teachers.findByPk(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    //Delete Course
    await teacher.destroy();
    return teacher;
  } catch (err) {
    console.error("Error when deleting Teacher", err);
    throw err;
  }
};

module.exports = { createTeacher, getTeacher, updateTeacher, deleteTeacher };
