const userService = require("../services/user.services");

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ action: "createUser", error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req, req.params.userId);
    if (!user) {
      res.status(404).json({ action: "getUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "getUser", error: err.message });
  }
};

getUserStatus = async (req, res) => {
  try {
    const user = await userService.getUserStatus(req, req.params.userId);
    if (!user) {
      res
        .status(404)
        .json({ action: "getUserStatus", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "getUserStatus", error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    if (!user) {
      res.status(404).json({ action: "getAllUsers", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "getAllUsers", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.session.user.id,
      req.params.userId,
      req.body
    );
    if (!user) {
      res.status(404).json({ action: "updateUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "updateUser", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(
      req.session.user.id,
      req.params.userId
    );
    if (!user) {
      res.status(404).json({ action: "deleteUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "deleteUser", error: err.message });
  }
};

const addCourseToUser = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const result = await userService.addCourseToUser(req, userId, courseId);
    return res.json(result);
  } catch (err) {
    console.error("Error adding course to user", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeCourseFromUser = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const result = await userService.removeCourseFromUser(
      req,
      userId,
      courseId
    );
    return res.json(result);
  } catch (err) {
    console.error("Error removing course from user", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserCourses = async (req, res) => {
  try {
    const user = await userService.getUserCourses(req, req.params.userId);
    if (!user) {
      res
        .status(404)
        .json({ action: "getUserCourses", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "getUserCourses", error: err.message });
  }
};

const subscribeUser = async (req, res) => {
  try {
    const success = await userService.subscribeUser(req, req.params.userId);
    if (!success) {
      res
        .status(403)
        .json({
          action: "subscribeUser",
          error: "Access forbidden. Can't subscribe",
        });
    } else {
      res
        .status(200)
        .json({
          action: "subscribeUser",
          message: "User subscribed successfully",
        });
    }
  } catch (err) {
    res.status(500).json({ action: "subscribeUser", error: err.message });
  }
};

const unsubscribeUser = async (req, res) => {
  try {
    const success = await userService.unsubscribeUser(req, req.params.userId);
    if (!success) {
      res
        .status(403)
        .json({
          action: "unsubscribeUser",
          error: "Access forbidden. Can't unsubscribe",
        });
    } else {
      res
        .status(200)
        .json({
          action: "unsubscribeUser",
          message: "User unsubscribed successfully",
        });
    }
  } catch (err) {
    res.status(500).json({ action: "unsubscribeUser", error: err.message });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  addCourseToUser,
  getUserCourses,
  subscribeUser,
  unsubscribeUser,
  getUserStatus,
  removeCourseFromUser,
};
