const  teacherService  = require("../services/teacher.services");

const createTeacher = async (req, res) => {
  try {
    const newTeacher = await teacherService.createTeacher(req.body);
    res.json(newTeacher);
  } catch (err) {
    res.status(500).json({ action: "createTeacher", error: err.message });
  }
};

const getTeacher = async (req, res) => {
  try {
    const options = {
      id: req.params.param,
      all: req.params.param == "all"
    }
    const teacher = await teacherService.getTeacher(options);
    if (!teacher) {
      res.status(404).json({ action: "getTeacher", error: "Teacher Not Found" });
    } else {
      res.json(teacher);
    }
  } catch (err) {
    res.status(500).json({ action: "getTeacher", error: err.message });
  }
};


const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.teacherId, req.body);
    if (!teacher) {
      res.status(404).json({ action: "updateteacher", error: "Teacher Not Found" });
    } else {
      res.json(teacher);
    }
  } catch (err) {
    res.status(500).json({ action: "updateTeacher", error: err.message });
  }
}


const deleteTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.deleteTeacher(req.params.teacherId);
    if (!teacher) {
      res.status(404).json({ action: "deleteTeacher", error: "Teacher Not Found" });
    } else {
      res.json(teacher);
    }
  } catch (err) {
    res.status(500).json({ action: "deleteTeacher", error: err.message });
  }
}


module.exports = { createTeacher, getTeacher, updateTeacher, deleteTeacher };
