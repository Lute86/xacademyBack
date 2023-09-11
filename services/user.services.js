const { users, courses } = require("../models");
const bcrypt = require("bcrypt");
const { models } = require('../config/files/sequelize.config');



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
      const user = await users.findByPk(userId, {
        attributes: ['first_name', 'last_name', 'email', 'subscribed'],
      });
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

const getUserStatus = async (req, userId) => {
  try {
    //Validates that user id is the same as the id being fetched
    if (req.session.user.id == userId) {
      const user = await users.findByPk(userId);

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
      if (finalUpdates.hasOwnProperty("subscribed")) {
        // Exclude the "subscribed" property from being updated
        delete finalUpdates.subscribed;
      }
      if (finalUpdates.hasOwnProperty("password")) {
        // Exclude the "password" property from being updated
        delete finalUpdates.password;
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
    } else {
      throw new Error("Access forbidden. Can't modify other users data");
    }
  } catch (err) {
    console.error("Error when deleting User", err);
    throw err;
  }
};

//Add course to user
const addCourseToUser = async (req, userId, courseId) => {
  try {
    //Validates the right user
    if (req.session.user.id == userId && req.session.user.subscribed == true) {
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
    } else {
      return {message: "Access forbidden. Can't add course without subscription"};
    }

  } catch (err) {
    console.error("Error adding course to user", err);
    throw err;
  }
};

const getUserCourses = async (req, userId) => {
  try {
    // Validates that user id is the same as the id being fetched
    if (req.session.user.id == userId) {
      const user = await users.findByPk(userId, {
        include: [{ all:true }],
      });
      return user.courses; // Return the courses associated with the user
    } else {
      throw new Error("Access forbidden. Can't access other users' courses");
    }
  } catch (err) {
    console.error("Error when fetching User", err);
    throw err;
  }
};


const subscribeUser = async (req, userId) => {
  try {
    // Find the user by their primary key (id)
    const user = await users.findByPk(userId);

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user id matches the session user id
    if (req.session.user.id == userId) {
      // Update the user's `subscribed` status to true
      await user.update({subscribed:true});
      // Send a success response
      return "User subscribed successfully";
    } else {
      throw new Error("Access forbidden. Can't subscribe");
    }
  } catch (err) {
    console.error("Error when subscribing User", err);
    throw err;
  }
};

const unsubscribeUser = async (req, userId) => {
  try {
    // Find the user by their primary key (id)
    const user = await users.findByPk(userId);

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user id matches the session user id
    if (req.session.user.id == userId) {
      // Update the user's `subscribed` status to true
      await user.update({subscribed:false});
      // Send a success response
      return "User subscribed successfully";
    } else {
      throw new Error("Access forbidden. Can't subscribe");
    }
  } catch (err) {
    console.error("Error when subscribing User", err);
    throw err;
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
};
