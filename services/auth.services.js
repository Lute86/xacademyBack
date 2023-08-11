const { users } = require("../models");

const validateUser = async (credentials) => {
  const { email, password } = credentials
  try {
    const user = await users.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    return user;
  } catch (err) {
    throw new Error("Error when validating User: " + err.message);
  }
};

module.exports = { validateUser };
