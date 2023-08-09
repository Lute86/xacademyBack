const queryService  = require("./services/query.services");
const userService  = require("./services/user.services");
const courseService  = require("./services/course.services");
const authService  = require("./services/auth.services");
const adminService  = require("./services/auth.services");
const teacherService  = require("./services/teacher.services");


module.exports = { queryService, userService, courseService, authService, adminService, teacherService }