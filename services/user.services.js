const { users, courses } = require("../models");
const bcrypt = require("bcrypt");



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
      const passwordMatch = await bcrypt.compare(updates.password, user.password);
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
      if (passwordMatch) {
        // Ensure that the role remains as "user" if not provided in the updates object
        const finalUpdates = { ...updates };
        if (finalUpdates.hasOwnProperty("role")) {
          finalUpdates.role = "user";
        }
        if (finalUpdates.hasOwnProperty("subscribed")) {
          // Exclude the "subscribed" property from being updated
          delete finalUpdates.subscribed;
        }
        if (finalUpdates.hasOwnProperty("createdAt")) {
          delete finalUpdates.createdAt;
        }
        if (finalUpdates.hasOwnProperty("updatedAt")) {
          delete finalUpdates.updatedAt;
        }
        if (finalUpdates.hasOwnProperty("deletedAt")) {
          delete finalUpdates.deletedAt;
        }
        if (finalUpdates.hasOwnProperty("new_password")) {
          const hashedPassword = await bcrypt.hash(updates.new_password, 10); 
          finalUpdates.password = hashedPassword;
          delete finalUpdates.new_password;
        }
        
        
        const updatedUser = await user.update(finalUpdates);
        return updatedUser;
      } else {
        throw new Error("Access forbidden. Invalid password");
      }
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

const removeCourseFromUser = async (req, userId, courseId) => {
  try {
    //Validates the right user
    if (req.session.user.id == userId) {
      const user = await users.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const course = await courses.findByPk(courseId);

      if (!course) {
        throw new Error("Course not found");
      }

      await user.removeCourse(course);
      return { message: "Course removed from the user successfully" };
    } else {
      return {message: "Access forbidden"};
    }

  } catch (err) {
    console.error("Error removing course from user", err);
    throw err;
  }
};

const getUserCourses = async (req, userId) => {
  try {
    // Validates user id
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

const payment = async (req, userId) => {
  const { name, cardNumber, expiryDate, cardCvv} = req.body
  try {
    if(req.session.user.id == userId){
      // Simulate payment verification with a 70% chance of success
      const success = Math.random() < 0.7;
      // Simulate petition delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (success) {
        req.session.user.paymentStatus = true
        return true
      } else {
        return false // Payment failed
      }
    }
    else{
      throw new Error("Access forbidden. Payment denied") 
    }
  } catch (err) {
    console.error("Error when processing payment", err);
    throw err;
  }
}

const subscribeUser = async (req, userId) => {
  try {
  
    const user = await users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Validate id
    if (req.session.user.id == userId) {
      // Update the user's `subscribed` status to true
      await user.update({subscribed:true});
      
      return true;
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

    const user = await users.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Validate id
    if (req.session.user.id == userId) {
      // Update the user's `subscribed` status to true
      await user.update({subscribed:false});
      
      return true;
    } else {
      throw new Error("Access forbidden. Can't unsubscribe");
    }
  } catch (err) {
    console.error("Error when unsubscribing User", err);
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
  payment,
  subscribeUser,
  unsubscribeUser,
  getUserStatus,
  removeCourseFromUser
};
