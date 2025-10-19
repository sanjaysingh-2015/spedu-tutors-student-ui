import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfileTabs from "./pages/ProfileTabs";
import ProfilePage from "./pages/ProfilePage";
import FindTutors from "./pages/FindTutors";
import Payment from "./pages/Payment";
import PaymentOverview from "./pages/PaymentOverview";
import BookSlotCalendar from "./pages/BookSlotCalendar";

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
          </Routes>
        </div>
      </div>
  );
}
