import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import DashboardBar from './components/DashboardBar'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileTabs from "./pages/ProfileTabs";
import ProfilePage from "./pages/ProfilePage";
import FindTutors from "./pages/FindTutors";
import Payment from "./pages/Payment";
import PaymentOverview from "./pages/PaymentOverview";
import BookSlotCalendar from "./pages/BookSlotCalendar";
import FindClasses from "./pages/FindClasses";
import BookClass from "./pages/BookClass";
import MyClasses from "./pages/MyClasses";
import Classes from "./pages/Classes";
import Sessions from "./pages/Sessions";

import JavaMasteryCourse from "./pages/JavaMasteryCourse";
import SpringBootCourse from "./pages/SpringBootCourse";
import DatabaseCourse from "./pages/DatabaseCourse";
import CloudComputing from "./pages/CloudComputing";

export default function App() {
  return (
      <div>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-tab" element={<ProfileTabs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<FindTutors />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-overview" element={<PaymentOverview />} />
            <Route path="/book/:tutorId" element={<BookSlotCalendar />} />
            <Route path="/classes/:tutorId" element={<FindClasses />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/book-class/:classId" element={<BookClass />} />
            <Route path="/my-classes" element={<MyClasses />} />
            <Route path="/my-sessions" element={<Sessions />} />
            <Route path="/courses/java-mastery" element={<JavaMasteryCourse />} />
            <Route path="/courses/spring-boot" element={<SpringBootCourse />} />
            <Route path="/courses/databases" element={<DatabaseCourse />} />
            <Route path="/courses/cloud-computing" element={<CloudComputing />} />
          </Routes>
        </div>
      </div>
  );
}
