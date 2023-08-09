const { users } = require("../models");

const validateUser = async (credentials) => {
  const { email, password } = credentials
  try {
    const user = await users.findAll({
      where: {
        email: email,
        password: password,
      },
    });
    if (user.length !== 0) {
      return user;
    }
    return false;
  } catch (err) {
    throw new Error("Error when validating User: " + err.message);
  }
};

module.exports = { validateUser };
