import {Router} from 'express';
import { getMyCourse, getMyFees, getMyProfile, loginStudent, logoutStudent, registerForStudent, updateProfile } from '../controller/studentController.js';
import { authStudent } from '../middleware/authStudent.js';

const router = Router();

router.route("/register").post(registerForStudent);
router.route("/login").post(loginStudent);

router.route("/profile").get(authStudent,getMyProfile);
router.route("/update").put(authStudent,updateProfile);
router.route("/course").get(authStudent,getMyCourse);
router.route("/fees").get(authStudent,getMyFees);
router.route("/logout").get(logoutStudent);

export default router;