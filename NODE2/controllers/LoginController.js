const validator = require("validator");
const bcrypt = require('bcrypt');
const UserModel = require("./../models/user.model");

const LoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.render("login", { message: "empty email" });
  if (!password) return res.render("login", { message: "empty password" });

  if (!validator.isEmail(email)) {
    return res.render("login", { message: "email is not a valid email" });
  }


  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    return res.render("login", { message: "user not found" });
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.render("login", { message: "Either email or password is incorrect" });
  }

  res.redirect("/index");
};

module.exports = LoginController;
