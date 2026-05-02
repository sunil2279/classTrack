import{Router} from'express';
import { addCourse, adminLogin, assignCourse, courseWiseStudents, dashboardStats, deleteCourse, deleteStudent, getAllCourse, getAllStudents, getStudentById, registerAdmin, updateFees } from '../controller/authController.js';
import { authAdmin } from '../middleware/authAdmin.js';

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(adminLogin);

router.route("/students").get(authAdmin,getAllStudents);
router.route("/student/:id").get(authAdmin,getStudentById);
router.route("/student/:id").delete(authAdmin,deleteStudent);
router.route("/courses").get(authAdmin,getAllCourse);
router.route("/course").post(authAdmin,addCourse);
router.route("/assign-course").post(authAdmin,assignCourse);
router.route("/update-fees").put(authAdmin,updateFees);
router.route("/dashboard").get(authAdmin,dashboardStats);
router.route("/course-stats").get(authAdmin,courseWiseStudents);
router.route("/delete-course/:id").delete(authAdmin,deleteCourse);

export default router;