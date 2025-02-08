import jwt from "jsonwebtoken";

// 📌 Generate JWT Token for Authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

export default generateToken;
