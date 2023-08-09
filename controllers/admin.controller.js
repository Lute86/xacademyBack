const  adminService  = require("../services/admin.services");

const createUser = async (req, res) => {
  try {
    const newUser = await adminService.createUser(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ action: "createUser", error: err.message });
  }
};

const getUserByCriteria = async (req, res) => {
  try {
    const options = {
      id: req.params.param,
      first_name: req.params.param,
      last_name: req.params.param,
      email: req.params.param,
      role: req.params.param,
    };

    const user = await adminService.getUserByCriteria(options);

    if (!user) {
      res.status(404).json({ action: "getUserByCriteria", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "getUserByCriteria", error: err.message });
  }
};



const getFullCourse = async (req, res) => {
  try {
    const course = await adminService.getFullCourse(req.params.courseId);
    if (!course) {
      res.status(404).json({ action: "getFullCourse", error: "Course Not Found" });
    } else {
      res.json(course);
    }
  } catch (err) {
    res.status(500).json({ action: "getFullCourse", error: err.message });
  }
};

const addCourseToTeacher = async (req, res) => {
  const { teacherId, courseId } = req.params;

  try {
    const result = await adminService.addCourseToTeacher(teacherId, courseId);
    return res.json(result);
  } catch (err) {
    console.error("Error adding course to teacher", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addCourseToUser = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const result = await adminService.addCourseToUser(userId, courseId);
    return res.json(result);
  } catch (err) {
    console.error("Error adding course to user", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Admins can delete any user, unlike users(only themselves)
const deleteUser = async (req, res) => {
  try {
    const user = await adminService.deleteUser(req.params.userId);
    if (!user) {
      res.status(404).json({ action: "deleteUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "deleteUser", error: err.message });
  }
}


// const getAllDeletedCourses = async (req, res) => {
//   try {
//     const courses = await adminService.getAllDeletedCourses();
//     if (!courses) {
//       res.status(404).json({ action: "getAllDeletedCourses", error: "Deleted courses Not Found" });
//     } else {
//       res.json(courses);
//     }
//   } catch (err) {
//     res.status(500).json({ action: "getAllDeletedCourses", error: err.message });
//   }
// };

const getAllDeleted = async (req, res) => {
  const modelName = req.params.param; // Assuming the model name is provided as a URL parameter, e.g., 'course', 'user', 'teacher'

  try {
    const records = await adminService.getAllDeleted(modelName);
    if (!records || records.length === 0) {
      res.status(404).json({ action: "getAllDeleted", error: `Deleted ${modelName} Not Found` });
    } else {
      res.json(records);
    }
  } catch (err) {
    res.status(500).json({ action: "getAllDeleted", error: err.message });
  }
};

module.exports = { createUser, getUserByCriteria, addCourseToTeacher, addCourseToUser, getAllDeleted, getFullCourse, deleteUser };
