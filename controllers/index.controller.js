const queryController = require("./query.controller");
const userController = require("./user.controller");
const courseController = require("./course.controller");
const authController = require("./auth.controller");
const adminController = require("./admin.controller");
const teacherController = require("./teacher.controller");
const emailController = require('./email.controller')

module.exports = {emailController, queryController, userController, courseController, authController, adminController, teacherController};