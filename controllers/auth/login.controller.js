const hashHelper = require(process.cwd() + "/helpers/password-encrypter");
const jwt = require("jsonwebtoken");

const { getUserByEmail } = require("../CRUD/user");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    console.log(user.password.trim() == password);
    const isPasswordValid = await hashHelper.compare(
      password,
      user.password.trim()
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Tạo token sử dụng jsonwebtoken
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );

    res.status(200).json({
      message: "login success!!",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = login;
