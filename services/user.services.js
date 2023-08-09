const {users} = require("../models");

const createUser = async (user) => {
  try {
    //defaultValue user
    // Set the role to "user" in the user object before creating it, extra security
    user.role = "user";

    const newUser = await users.create(user);
    return newUser;
  } catch (err) {
    console.error("Error when creating User", err);
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const user = await users.findByPk(userId, { include: { all: true } });
    if (user) {
      console.log(user.firstName);
    }
    return user;
  } catch (err) {
    console.error("Error when fetching User", err);
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const user = await users.findAll({ include: { all: true } });
    return user;
  } catch (err) {
    console.error("Error when fetching Users", err);
    throw err;
  }
};


const updateUser = async (userId, updates) => {
  try {
    //TODO => validate that user id is the same as the id being modified

    const user = await users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Ensure that the role remains as "user" if not provided in the updates object
    const finalUpdates = { ...updates };
    if (finalUpdates.hasOwnProperty("role")) {
      finalUpdates.role = "user";
    }

    const updatedUser = await user.update(finalUpdates);
    return updatedUser;
  } catch (err) {
    console.error("Error when updating User", err);
    throw err;
  }
};

//TODO => validate that user id is the same as the id being deleted
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


module.exports = { createUser, getUser, updateUser, deleteUser, getAllUsers };
