const USER_ROLE = false;
const ADMIN_ROLE = true;
const models = require(process.cwd() + "/models");
const jwt = require("jsonwebtoken");

async function checkRoleUser(request, response, next) {
  try {
    const decode = jwt.verify(request.body.token, process.env.JWT_SECRET_KEY);
    const requestRole = (await models.User.findByPk(decode.id)).isAdmin;

    // Check if request user is admin or not
    if (requestRole != ADMIN_ROLE) {
      if (requestRole != USER_ROLE) {
        return response.status(400).json({
          message: "Invalid role!",
        });
      } else next();
    } else next();
  } catch (error) {
    return response.status(401).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

async function checkRoleAdmin(request, response, next) {
  try {
    const decode = jwt.verify(request.body.token, process.env.JWT_SECRET_KEY);
    const requestRole = (await models.User.findByPk(decode.id)).isAdmin;
    // Check if request user is admin or not
    if (requestRole != ADMIN_ROLE) {
      return response.status(400).json({
        message: "Invalid role!",
      });
    } else next();
  } catch (error) {
    return response.status(401).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

module.exports = {
  checkRoleUser: checkRoleUser,
  checkRoleAdmin: checkRoleAdmin,
};
