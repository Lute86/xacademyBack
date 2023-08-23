const { users } = require("../models");
const bcrypt = require('bcrypt');

const validateUser = async (credentials) => {
  const { email, password } = credentials;
  try {
    const user = await users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
    }

    return null; // Return null if user is not found or password doesn't match
  } catch (err) {
    throw new Error("Error when validating User: " + err.message);
  }
};

module.exports = { validateUser };
