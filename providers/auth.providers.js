const { users } = require("../models");

const validateUser = async (credentials) => {
  const { email } = credentials;
  try {
    const user = await users.findOne({
      where: {
        email: email,
      },
    });
    if(!user) return null
    return user; 
  } catch (err) {
    throw new Error("Error: " + err.message);
  }
};

module.exports = { validateUser };
