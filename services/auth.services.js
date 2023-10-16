const authProvider = require("../providers/auth.providers");
const bcrypt = require('bcrypt');

const validateUser = async (credentials) => {
  const { password } = credentials;
  try {
    const user = await authProvider.validateUser(credentials);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
      return {status: 400, message:"Password doesn't match", user:null}
    }

    return {status: 404, message:'User not found', user:null}; 
  } catch (err) {
    throw new Error("Error when validating User: " + err.message);
  }
};

module.exports = { validateUser };
