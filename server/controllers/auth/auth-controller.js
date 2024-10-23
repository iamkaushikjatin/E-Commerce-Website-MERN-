import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message:
          "User already exists with this email!! Please try again with different email",
      });

    const hashPassword = await bcrypt.hash(password, 13);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "You have signed up successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!!",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checks if the user exists in database
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User does not exist!! Please sign up first",
      });
    //checks the password
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({ success: false, message: "Password is incorrect!!" });

    //Creating token for logging in
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName
      },
      process.env.AUTH_TOKEN_SECRET_KEY,
      { expiresIn: "60m" }
    );

    
    

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "You have logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!!",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!!",
  });
};

// authentication middleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "You cannot access this page",
    });
  try {
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "You cannot access this page",
    });
  }
};



export { registerUser, loginUser, logoutUser, authMiddleware };
