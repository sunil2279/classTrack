import jwt from "jsonwebtoken";

export const authStudent = (req, res, next) => {
  try {
  
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }


    const decoded = jwt.verify(token, process.env.SECRET_KEY);

     if (decoded.role !== "student") {
      return res.status(403).json({ message: "Access denied (Student only)" });
    }

    req.student = {
      id: decoded.id,
    };


    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};