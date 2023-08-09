const  userService  = require("../services/user.services");

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
    const user = await userService.getUser(req.params.userId);
    if (!user) {
      res.status(404).json({ action: "getUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "getUser", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.userId, req.body);
    if (!user) {
      res.status(404).json({ action: "updateUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "updateUser", error: err.message });
  }
}


const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    if (!user) {
      res.status(404).json({ action: "deleteUser", error: "User Not Found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ action: "deleteUser", error: err.message });
  }
}

module.exports = { createUser, getUser, updateUser, deleteUser };
