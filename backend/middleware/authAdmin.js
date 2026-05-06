import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "token not provided!" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await User.findById(decode.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied! Not an admin" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
