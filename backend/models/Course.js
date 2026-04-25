import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
    },
    fees: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
},{timestamps:true});

export default mongoose.model("Course",CourseSchema);