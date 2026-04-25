import bcrypt from 'bcrypt'
import  crypto  from 'crypto'
import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerForStudent = async(req,res) => {
    try {
        const {name ,email,phone,password} = req.body;
        const student = await Student.findOne({email});
        
        if(!name || !email || !phone || !password){
            return res.status(400).json({message:"All fields are required!"});
        }

        if(student){
            return res.status(400).json({message:"student already exit"});
        }

        const newpassword = await bcrypt.hash(password,10);

        const newStudent = new Student({
            name,
            email,
            password:newpassword,
            phone
        });
        const token = jwt.sign(
        { id: newStudent._id },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
        );

        await newStudent.save();

        return res.status(201).json({message: "Student registered successfully!",
            student:{
                _id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email
            },
            token,
            role:"student"
        });

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const loginStudent = async(req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields are required!"});
        }

        const student = await Student.findOne({email:email});
        if(!student){
            return res.status(400).json({message:"User not found!"});
        }
        const isMatch = await bcrypt.compare(password,student.password);
        
        
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign(
            {id:student._id},
            process.env.SECRET_KEY,
            {expiresIn:"1d"}
        )
        
        return res.json({
            message:"Login Successful",
            token,
            student:{
            _id:student._id,
            name:student.name
        },role:"student"});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getMyProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select("-password");
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ student });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {name,email,phone} = req.body;
        const student  = await Student.findById(req.student.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        if(name) student.name = name;
        if(email) student.email = email;
        if(phone) student.phone = phone;
        student.password = undefined;
        await student.save();
        return res.status(200).json({message:"Profile updated successfully",student});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const getMyCourse = async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).populate("course");
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }

        return res.status(200).json(student.course);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getMyFees = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    if(!student){
       return res.status(404).json({message:"Student not found"});
    }
    res.status(200).json(student.fees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutStudent = async(req,res) => {
    return res.status(200).json({message:"Logout successful"});
}


