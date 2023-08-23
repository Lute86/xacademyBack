const { users } = require("../models");
const bcrypt = require('bcrypt');


const createUser = async (user) => {
  try {
    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the saltRounds

    // Set the role and hashed password in the user object before creating it
    user.role = "user";
    user.password = hashedPassword;

    const newUser = await users.create(user);
    return newUser;
  } catch (err) {
    console.error("Error when creating User", err);
    throw err;
  }
};

const getUser = async (req, userId) => {
  try {
    //Validates that user id is the same as the id being fetched
    if (req.session.user.id == userId) {
      const user = await users.findByPk(userId, { include: { all: true } });
      if (user) {
        console.log(user.first_name);
      }
      return user;
    } else {
      throw new Error("Access forbidden. Can't access other users data");
    }
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

const updateUser = async (id, userId, updates) => {
  try {
    //Validates that user id is the same as the id being updated
    if (id == userId) {
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
    } else {
      throw new Error("Access forbidden. Can't modify other users data");
    }
  } catch (err) {
    console.error("Error when updating User", err);
    throw err;
  }
};

// Soft delete user
const deleteUser = async (id, userId) => {
  try {
    //Validates that user id is the same as the id being deleted
    if (id == userId) {
      const user = await users.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      //Delete User
      await user.destroy();
      return user;
    }else {
      throw new Error("Access forbidden. Can't modify other users data");
    }
  } catch (err) {
    console.error("Error when deleting User", err);
    throw err;
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser, getAllUsers };
