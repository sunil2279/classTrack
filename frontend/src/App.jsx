
import Sidebar from "./components/Sidebar.jsx";
import Register from "./pages/Student/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/Student/StudentDashboard.jsx";
import MyCoursePage from "./pages/Student/myCoursePage.jsx";
import FeesStatus from "./pages/Student/feesStatus.jsx";
import Profile from "./pages/Student/profile.jsx";
import ProtectedRoute from "./protectedRoute/protectedroute.jsx";

//admin
import AdminLogin from "./pages/Admin/Login.jsx";
import AdminDashboard from "./pages/Admin/DashboardComponent.jsx";
import StudentComponent from "./pages/Admin/StudentComponent.jsx";
import CoursesComponent from "./pages/Admin/coursesComponent.jsx";
import StudentProfile from "./pages/Admin/StudentProfile.jsx";
import CreateNewCourse from "./pages/Admin/CreateNewCourse.jsx";
import AdminProtectedRoute from "./protectedRoute/adminProtectRoute.jsx";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      
    
      <Route path="/" element={<Register/>}/>
      <Route path="/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard/></ProtectedRoute>} />
      <Route path="/mycourses" element={<ProtectedRoute allowedRole="student"><MyCoursePage/></ProtectedRoute>}></Route>
      {/* <Route path="/feesStatus" element={<ProtectedRoute allowedRole="student"><FeesStatus/></ProtectedRoute>}></Route> */}
      <Route path="/profile" element={<ProtectedRoute allowedRole="student"><Profile/></ProtectedRoute>}></Route>


      <Route path="/admin-login" element={<AdminLogin/>}></Route>
      
      <Route path="/admin-dashboard" element={ <AdminProtectedRoute allowedRole="admin"><AdminDashboard/></AdminProtectedRoute>}></Route>

      <Route path="/admin-students" element={<AdminProtectedRoute allowedRole="admin"><StudentComponent/></AdminProtectedRoute>}></Route>

      <Route path="/admin-courses" element={<AdminProtectedRoute allowedRole="admin"><CoursesComponent/></AdminProtectedRoute>}></Route>

      <Route path="/admin-student/:id" element={<AdminProtectedRoute allowedRole="admin"><StudentProfile/></AdminProtectedRoute>}></Route>

      {/* <Route pa></Route> */}

      <Route path="/admin-addnewcourse" element={<AdminProtectedRoute allowedRole="admin"><CreateNewCourse/></AdminProtectedRoute>}></Route>
      
      <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
