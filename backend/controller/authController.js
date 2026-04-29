import bcrypt from "bcrypt";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Course from "../models/Course.js";


//admin login register
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: newpassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "admin created successfully !" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

    return res.status(200).json({
      message: "Admin Login successful!",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    if (students.length == 0) {
      return res.status(404).json({ message: "No students found" });
    }

    return res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id).select("-password").populate("course");
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }
    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    return res.json({ message: "Student Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    if (student.course.includes(courseId)) {
      return res.status(400).json({
        message: "Course already assigned",
      });
    }

    student.course.push(courseId);
    student.fees.totalAmount = (student.fees.totalAmount || 0) + course.fees;

    await student.save();
    return res.json({ message: "Course assigned successfully", student });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { name, duration, fees, description } = req.body;

    if (!name || !fees || !duration || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = new Course({
      name,
      duration,
      fees,
      description,
    });

    await course.save();

    return res
      .status(201)
      .json({ message: "course added successfully!", course });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFees = async (req, res) => {
  try {
    const { studentId, paidAmount } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.fees.paidAmount += paidAmount;
    if (student.fees.paidAmount >= student.fees.totalAmount) {
      student.fees.status = "Paid";
    } else if (student.fees.paidAmount > 0) {
      student.fees.status = "Partial";
    }

    await student.save();

    return res.json({
      message: "Fees updated",
      fees: student.fees,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const dashboardStats = async (req, res) => {
  try {
    const TotalStudent = await Student.countDocuments();
    const TotalCourse = await Course.countDocuments();

    const students = await Student.find();

    let totalEarnings = 0;

    students.forEach((s) => {
      totalEarnings += s.fees.paidAmount;
    });

    return res.json({
      TotalCourse,
      TotalStudent,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
