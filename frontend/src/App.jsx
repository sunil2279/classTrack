// import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import Register from "./pages/Student/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/Student/StudentDashboard.jsx";
import MyCoursePage from "./pages/Student/myCoursePage.jsx";
import FeesStatus from "./pages/Student/feesStatus.jsx";
import Profile from "./components/profile.jsx";
import ProtectedRoute from "./protectedRoute/protectedroute.jsx";

//admin
import AdminLogin from "./pages/Admin/Login.jsx";
import AdminDashboard from "./pages/Admin/DashboardComponent.jsx";
import StudentComponent from "./pages/Admin/StudentComponent.jsx";
import CoursesComponent from "./pages/Admin/coursesComponent.jsx";
import FeesComponent from "./pages/Admin/FeesComopnent.jsx";
import StudentProfile from "./pages/Admin/StudentProfile.jsx";


function App() {

  return (
    <BrowserRouter>
    <Routes>
      
    
      <Route path="/" element={<Register/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard/></ProtectedRoute>} />
      <Route path="/mycourses" element={<ProtectedRoute><MyCoursePage/></ProtectedRoute>}></Route>
      <Route path="/feesStatus" element={<ProtectedRoute><FeesStatus/></ProtectedRoute>}></Route>
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>


      <Route path="/admin-login" element={<AdminLogin/>}></Route>
      
      <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>

      <Route path="/admin-students" element={<StudentComponent/>}></Route>

      <Route path="/admin-courses" element={<CoursesComponent/>}></Route>

      <Route path="/admin-Fees" element={<FeesComponent/>}></Route>

      <Route path="/admin-student/:id" element={<StudentProfile/>}></Route>
      
      <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
