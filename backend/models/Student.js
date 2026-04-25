import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    fees: {
      totalAmount: {
        type: Number,
      },
      paidAmount: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        enum: ["Paid", "Pending", "Partial"],
        default: "Pending",
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Student", StudentSchema);
