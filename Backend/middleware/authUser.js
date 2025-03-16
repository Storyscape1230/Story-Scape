import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//-----------------Authentication------------------/
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    console.log("Middleware : ", token);

    if (!token) {
      return res.status(401).json({ error: "This user is not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "This user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error occurring in Authentication: " + error);
    return res.status(401).json({ error: "This user is not authenticated" });
  }
};

//-----------------Authorization------------------/
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `This user with given role ${req.user.role} is not allowed` });
    }
    next();
  };
};